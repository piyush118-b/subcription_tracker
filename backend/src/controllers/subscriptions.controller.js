const supabase = require('../config/supabaseClient');
const { normalizeToMonthly, calculateTotalMonthlyBurn } = require('../services/costNormalizer.service');
const { attachRenewalInfo, countUpcomingRenewals } = require('../services/renewalCalculator.service');

async function create(req, res, next) {
  try {
    const { service_name, cost, billing_cycle, next_renewal_date, description } = req.body;

    const { data, error } = await supabase
      .from('subscriptions')
      .insert([
        {
          service_name,
          cost,
          billing_cycle,
          next_renewal_date,
          description: description || null,
          status: 'active',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    const enriched = attachRenewalInfo(data);
    res.status(201).json(enriched);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const subscriptions = data.map((sub) => {
      const withMonthly = { ...sub, monthly_normalized_cost: normalizeToMonthly(sub.cost, sub.billing_cycle) };
      return attachRenewalInfo(withMonthly);
    });

    const totalMonthlyBurn = calculateTotalMonthlyBurn(subscriptions);
    const upcomingRenewalsCount = countUpcomingRenewals(subscriptions);

    res.json({
      subscriptions,
      metrics: {
        total_monthly_burn: Math.round(totalMonthlyBurn * 100) / 100,
        upcoming_renewals_count: upcomingRenewalsCount,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('subscriptions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({
        error: { message: 'Subscription not found', code: 'NOT_FOUND' },
      });
    }

    const withMonthly = { ...data, monthly_normalized_cost: normalizeToMonthly(data.cost, data.billing_cycle) };
    const enriched = attachRenewalInfo(withMonthly);

    res.json(enriched);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, updateStatus, remove };

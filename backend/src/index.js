require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Helper to compute derived fields
function computeFields(subscription) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Normalize cost to monthly
  let monthlyNormalizedCost = subscription.cost;
  if (subscription.billing_cycle === 'yearly') {
    monthlyNormalizedCost = subscription.cost / 12;
  } else if (subscription.billing_cycle === 'weekly') {
    monthlyNormalizedCost = subscription.cost * 4.33;
  }

  // Calculate days until renewal
  let daysUntilRenewal = null;
  if (subscription.next_renewal_date) {
    const renewalDate = new Date(subscription.next_renewal_date);
    renewalDate.setHours(0, 0, 0, 0);
    const diffTime = renewalDate - today;
    daysUntilRenewal = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return {
    ...subscription,
    monthly_normalized_cost: Math.round(monthlyNormalizedCost * 100) / 100,
    days_until_renewal: daysUntilRenewal,
  };
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET all subscriptions
app.get('/api/subscriptions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const enriched = data.map(computeFields);
    res.json(enriched);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST create subscription
app.post('/api/subscriptions', async (req, res) => {
  try {
    const { service_name, cost, billing_cycle, next_renewal_date, description } = req.body;

    if (!service_name || !cost || !billing_cycle || !next_renewal_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .insert([
        {
          service_name,
          cost: parseFloat(cost),
          billing_cycle,
          next_renewal_date,
          description: description || null,
          status: 'active',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(computeFields(data));
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// PATCH update subscription
app.patch('/api/subscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { service_name, cost, billing_cycle, next_renewal_date, description, status } = req.body;

    const updates = {};
    if (service_name !== undefined) updates.service_name = service_name;
    if (cost !== undefined) updates.cost = parseFloat(cost);
    if (billing_cycle !== undefined) updates.billing_cycle = billing_cycle;
    if (next_renewal_date !== undefined) updates.next_renewal_date = next_renewal_date;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json(computeFields(data));
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE subscription
app.delete('/api/subscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

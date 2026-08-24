function normalizeToMonthly(cost, billingCycle) {
  if (billingCycle === 'yearly') {
    return Math.round((cost / 12) * 100) / 100;
  }
  return cost;
}

function calculateTotalMonthlyBurn(subscriptions) {
  return subscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + normalizeToMonthly(s.cost, s.billing_cycle), 0);
}

module.exports = { normalizeToMonthly, calculateTotalMonthlyBurn };

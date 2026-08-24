const { differenceInCalendarDays, parseISO } = require('date-fns');

const RENEWAL_ALERT_THRESHOLD_DAYS = 7;

function getDaysUntilRenewal(nextRenewalDate, referenceDate = new Date()) {
  return differenceInCalendarDays(parseISO(nextRenewalDate), referenceDate);
}

function isRenewingSoon(nextRenewalDate, referenceDate = new Date()) {
  const days = getDaysUntilRenewal(nextRenewalDate, referenceDate);
  return days >= 0 && days <= RENEWAL_ALERT_THRESHOLD_DAYS;
}

function countUpcomingRenewals(subscriptions, referenceDate = new Date()) {
  return subscriptions.filter(
    (s) => s.status === 'active' && isRenewingSoon(s.next_renewal_date, referenceDate)
  ).length;
}

function attachRenewalInfo(subscription, referenceDate = new Date()) {
  const daysUntilRenewal = getDaysUntilRenewal(subscription.next_renewal_date, referenceDate);
  return {
    ...subscription,
    days_until_renewal: daysUntilRenewal,
    renewing_soon: isRenewingSoon(subscription.next_renewal_date, referenceDate),
  };
}

module.exports = {
  getDaysUntilRenewal,
  isRenewingSoon,
  countUpcomingRenewals,
  attachRenewalInfo,
  RENEWAL_ALERT_THRESHOLD_DAYS,
};

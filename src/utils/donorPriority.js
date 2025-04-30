// utils/donorPriority.js

const WEIGHTS = {
  availability: 60,
  overdueDonation: 25,
  recentDonationPenalty: -20,
  noHistory: 15,
  optimalAge: 20,
  locationMatch: 10,
};

/**
 * Calculates the number of days since the last donation.
 */
const getDaysSinceDonation = (lastDonated) => {
  const last = new Date(lastDonated);
  const now = new Date();
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
};

/**
 * Calculate the priority of a donor.
 * @param {Object} donor
 * @param {String} [searchCity] Optional city to match location.
 */
export const calculateDonorPriority = (donor, searchCity = "") => {
  let priority = 0;

  // Availability
  if (donor.available) priority += WEIGHTS.availability;

  // Last donation logic
  if (donor.lastDonated) {
    const days = getDaysSinceDonation(donor.lastDonated);

    if (days >= 90) {
      priority += WEIGHTS.overdueDonation;
    } else if (days < 60) {
      priority += WEIGHTS.recentDonationPenalty;
    }
  } else {
    // No history
    priority += WEIGHTS.noHistory;
  }

  // Age range bonus (18–50)
  if (donor.age >= 18 && donor.age <= 50) {
    priority += WEIGHTS.optimalAge;
  }

  // Location match (optional)
  if (
    searchCity &&
    donor.city &&
    donor.city.toLowerCase() === searchCity.toLowerCase()
  ) {
    priority += WEIGHTS.locationMatch;
  }

  return priority;
};

/**
 * Sorts donors by descending priority.
 * @param {Array} donors
 * @param {String} [searchCity] Optional city to match location.
 */
export const sortDonorsByPriority = (donors, searchCity = "") => {
  return [...donors].sort(
    (a, b) =>
      calculateDonorPriority(b, searchCity) -
      calculateDonorPriority(a, searchCity)
  );
};

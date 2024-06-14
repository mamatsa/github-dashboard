export const timePassed = (date: string): string => {
  const created = new Date(date);
  const now = new Date();
  const diff = now.getTime() - created.getTime();
  const minutesPassed = Math.floor(diff / (1000 * 60));

  if (minutesPassed >= 1440 * 2) {
    // More than 2 days
    return `${Math.floor(minutesPassed / 1440)} days ago`;
  } else if (minutesPassed >= 1440) {
    // More than 1 day but less than 2 days
    return "yesterday";
  } else if (minutesPassed >= 60) {
    // More than 1 hour but less than 1 day
    return `${Math.floor(minutesPassed / 60)} hours ago`;
  } else {
    // Less than 1 hour
    return `${minutesPassed} minutes ago`;
  }
};

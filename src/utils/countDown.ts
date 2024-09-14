export const calculateTimeLeft = (futureDate: Date) => {
  const now = new Date().getTime();
  const targetDate = futureDate.getTime();
  const difference = targetDate - now;

  let timeLeft = {
    days: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    };
  }

  return timeLeft;
};

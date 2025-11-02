export const formatTime = (ms: number) => {
  const totalMinutes = Math.floor(Math.abs(ms) / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

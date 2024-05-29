/**
 * Returns a random integer between `min` and `max` inclusive, with a bias towards higher or lower values.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @param {number} bias - The bias towards higher or lower values (0 to 1, where 0 is lower values and 1 is higher values).
 * @param {number} influence - The influence of the bias on the result (0 to 1, where 0 is no influence and 1 is full influence).
 * @returns {number} A random integer between `min` and `max` with the specified bias.
 *
 * @example
 * // Returns a random integer between 50 and 150, with a bias towards higher values.
 * const randomValue = getRandomInt(50, 150, 0.75, 0.5);
 */
export const getRandomInt = (min: number, max: number, bias: number, influence: number): number => {
  const random = Math.random();
  const mix = random * (1 - influence) + bias * influence;
  return Math.floor(min + mix * (max - min + 1));
}

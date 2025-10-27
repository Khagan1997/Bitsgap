export function generateRandomPrice(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomVolume(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

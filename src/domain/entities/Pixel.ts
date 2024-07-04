export interface Pixel {
  x: number;
  y: number;
}

export function createPixel(x: number, y: number): Pixel {
  return { x, y };
}

import { Pixel } from "@/domain/entities/Pixel";

export interface IPixelRepository {
  getPixel(x: number, y: number): Pixel;
}

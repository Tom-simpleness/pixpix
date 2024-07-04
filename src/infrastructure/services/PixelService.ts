import { IPixelService } from "@/application/interfaces/IPixelService";

export class PixelService implements IPixelService {
  getPixelName(x: number, y: number): string {
    return `x${x}y${y}`;
  }
}

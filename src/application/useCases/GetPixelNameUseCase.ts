import { IPixelService } from "../interfaces/IPixelService";
import { IPixelRepository } from "../interfaces/IPixelRepository";

export class GetPixelNameUseCase {
  constructor(
    private pixelService: IPixelService,
    private pixelRepository: IPixelRepository
  ) {}

  execute(x: number, y: number): string {
    const pixel = this.pixelRepository.getPixel(x, y);
    return this.pixelService.getPixelName(pixel.x, pixel.y);
  }
}

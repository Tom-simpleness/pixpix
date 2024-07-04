import { PixelRepository } from "@/infrastructure/repositories/PixelRepository";

export class SavePixelBatchUseCase {
  constructor(private pixelRepository: PixelRepository) {}

  async execute(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): Promise<void> {
    await this.pixelRepository.savePixelBatch(startX, startY, endX, endY);
  }
}

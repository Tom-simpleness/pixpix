import { Pixel, createPixel } from "@/domain/entities/Pixel";

export class PixelRepository {
  private pixelSelections: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    timestamp: Date;
  }[] = [];

  getPixel(x: number, y: number): Pixel {
    return createPixel(x, y);
  }

  async savePixelBatch(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): Promise<void> {
    this.pixelSelections.push({
      startX,
      startY,
      endX,
      endY,
      timestamp: new Date(),
    });
    console.log("Pixel batch saved:", {
      startX,
      startY,
      endX,
      endY,
      timestamp: new Date(),
    });
    // In a real application, you would save this to a database
  }

  getPixelSelections(): {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    timestamp: Date;
  }[] {
    return this.pixelSelections;
  }
}

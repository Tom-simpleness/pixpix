import { NextResponse } from "next/server";
import { PixelRepository } from "@/infrastructure/repositories/PixelRepository";
import { SavePixelBatchUseCase } from "@/application/useCases/SavePixelBatchUseCase";

const pixelRepository = new PixelRepository();
const savePixelBatchUseCase = new SavePixelBatchUseCase(pixelRepository);

export async function POST(request: Request) {
  const { startX, startY, endX, endY } = await request.json();

  if (
    typeof startX !== "number" ||
    typeof startY !== "number" ||
    typeof endX !== "number" ||
    typeof endY !== "number"
  ) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  await savePixelBatchUseCase.execute(startX, startY, endX, endY);

  return NextResponse.json({ message: "Pixel batch saved successfully" });
}

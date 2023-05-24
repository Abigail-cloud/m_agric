import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BestPractices } from './Interface/practice.interface';
import { CropPractice } from '@prisma/client';

@Injectable()
export class CropService {
  constructor(private prisma: PrismaService) {}
  async createBestPractices(userInput: BestPractices): Promise<CropPractice> {
    const { createdBy, cropId, ...data } = userInput;
    return this.prisma.cropPractice.create({
      data: {
        ...data,
        crop: {
          connect: { id: cropId }, // Connect the crop field with the cropId
        },
        createdBy: {
          connect: { id: createdBy }, // Connect the createdBy field with the user's id
        },
      },
    });
  }

  async findAll(): Promise<CropPractice[]> {
    return this.prisma.cropPractice.findMany();
  }

  async findById(plant_id: number): Promise<CropPractice | null> {
    return this.prisma.cropPractice.findUnique({
      where: { plant_id },
    });
  }

  async update(
    plant_id: number,
    data: Partial<CropPractice>,
  ): Promise<CropPractice | null> {
    return this.prisma.cropPractice.update({
      where: { plant_id },
      data,
    });
  }
}

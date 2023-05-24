import { BadRequestException, Injectable } from '@nestjs/common';
import { Crop } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CropTracker } from './Interface/cro.tracker.type';

@Injectable()
export class CropTrackerService {
  constructor(private prisma: PrismaService) {}
  async createCrop(userInput: CropTracker, email: string): Promise<Crop> {
    const userExist = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!userExist) {
      throw new BadRequestException('Wrong credentials');
    }
    return this.prisma.crop.create({
      data: userInput,
    });
  }

  //   async findAll(): Promise<CropPractice[]> {
  //     return this.prisma.cropPractice.findMany();
  //   }

  //   async findById(plant_id: number): Promise<CropPractice | null> {
  //     return this.prisma.cropPractice.findUnique({
  //       where: { plant_id },
  //     });
  //   }
}

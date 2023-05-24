import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { CropService } from './crop.service';
import { BestPractices } from './Interface/practice.interface';
import { CropPractice } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/tools/jwt.guard';
import log from 'src/utils/log';

@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(
    @Request() req: any,
    @Body() data: BestPractices,
  ): Promise<CropPractice> {
    log.info(req.user);
    const createdBy = req.user.id;
    const inputData = { ...data, createdBy }; // Include createdBy in the input data
    return this.cropService.createBestPractices(inputData);
  }
  @Get()
  getAllCropPractices() {
    return this.cropService.findAll();
  }
}

import { Module } from '@nestjs/common';
import { CropTrackerService } from './crop-tracker.service';
import { CropTrackerController } from './crop-tracker.controller';

@Module({
  controllers: [CropTrackerController],
  providers: [CropTrackerService],
})
export class CropTrackerModule {}

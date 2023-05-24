import { Controller } from '@nestjs/common';
import { CropTrackerService } from './crop-tracker.service';

@Controller('crop-tracker')
export class CropTrackerController {
  constructor(private readonly cropTrackerService: CropTrackerService) {}
}

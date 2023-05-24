import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { JwtStrategy } from 'src/auth/tools/jwt.strategy';

@Module({
  controllers: [CropController],
  providers: [CropService, JwtStrategy],
})
export class CropModule {}

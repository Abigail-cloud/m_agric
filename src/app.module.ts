import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { CropModule } from './crop/crop.module';
import { UsersModule } from './users/users.module';
import { CropTrackerModule } from './crop-tracker/crop-tracker.module';

@Module({
  imports: [AuthModule, PrismaModule, CropModule, UsersModule, CropTrackerModule],
})
export class AppModule {}

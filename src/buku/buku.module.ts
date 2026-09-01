import { Module } from '@nestjs/common';
import { BukuService } from './buku.service';
import { BukuController } from './buku.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BukuService],
  controllers: [BukuController],
})
export class BukuModule {}
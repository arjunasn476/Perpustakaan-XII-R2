import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BukuModule } from './buku/buku.module';
import { PeminjamanModule } from './peminjaman/peminjaman.module';

@Module({
  imports: [PrismaModule, AuthModule, BukuModule, PeminjamanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

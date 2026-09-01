import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/peminjaman.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('peminjaman')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PeminjamanController {
  constructor(private peminjamanService: PeminjamanService) {}

  @Post()
  pinjam(@Req() req, @Body() dto: CreatePeminjamanDto) {
    return this.peminjamanService.pinjam(req.user.userId, dto);
  }

  @Patch(':id/kembalikan')
  kembalikan(@Req() req, @Param('id') id: string) {
    return this.peminjamanService.kembalikan(req.user.userId, +id);
  }

  @Get('saya')
  findMine(@Req() req) {
    return this.peminjamanService.findMine(req.user.userId);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.peminjamanService.findAll();
  }
}
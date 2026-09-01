import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BukuService } from './buku.service';
import { CreateBukuDto, UpdateBukuDto } from './dto/buku.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('buku')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BukuController {
  constructor(private bukuService: BukuService) {}

  @Get()
  findAll() {
    return this.bukuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bukuService.findOne(+id);
  }

  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateBukuDto) {
    return this.bukuService.create(dto);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateBukuDto) {
    return this.bukuService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.bukuService.remove(+id);
  }
}
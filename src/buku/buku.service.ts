import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBukuDto, UpdateBukuDto } from './dto/buku.dto';

@Injectable()
export class BukuService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.buku.findMany();
  }

  async findOne(id: number) {
    const buku = await this.prisma.buku.findUnique({ where: { id } });
    if (!buku) throw new NotFoundException('Buku tidak ditemukan');
    return buku;
  }

  create(dto: CreateBukuDto) {
    return this.prisma.buku.create({ data: dto });
  }

  async update(id: number, dto: UpdateBukuDto) {
    await this.findOne(id);
    return this.prisma.buku.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.buku.delete({ where: { id } });
  }
}
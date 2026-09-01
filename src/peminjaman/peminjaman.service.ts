import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePeminjamanDto } from './dto/peminjaman.dto';

@Injectable()
export class PeminjamanService {
  constructor(private prisma: PrismaService) {}

  async pinjam(userId: number, dto: CreatePeminjamanDto) {
    const buku = await this.prisma.buku.findUnique({ where: { id: dto.bukuId } });
    if (!buku) throw new NotFoundException('Buku tidak ditemukan');
    if (buku.stok < 1) throw new BadRequestException('Stok buku habis');

    await this.prisma.buku.update({
      where: { id: buku.id },
      data: { stok: buku.stok - 1 },
    });

    return this.prisma.peminjaman.create({
      data: { userId, bukuId: buku.id },
    });
  }

  async kembalikan(userId: number, id: number) {
    const peminjaman = await this.prisma.peminjaman.findUnique({ where: { id } });
    if (!peminjaman) throw new NotFoundException('Data peminjaman tidak ditemukan');
    if (peminjaman.userId !== userId) throw new ForbiddenException('Bukan peminjaman kamu');
    if (peminjaman.status === 'KEMBALI') throw new BadRequestException('Buku sudah dikembalikan');

    await this.prisma.buku.update({
      where: { id: peminjaman.bukuId },
      data: { stok: { increment: 1 } },
    });

    return this.prisma.peminjaman.update({
      where: { id },
      data: { status: 'KEMBALI', tglKembali: new Date() },
    });
  }

  findMine(userId: number) {
    return this.prisma.peminjaman.findMany({
      where: { userId },
      include: { buku: true },
    });
  }

  findAll() {
    return this.prisma.peminjaman.findMany({
      include: { buku: true, user: true },
    });
  }
}
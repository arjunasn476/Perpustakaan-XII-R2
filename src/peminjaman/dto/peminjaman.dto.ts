import { IsInt } from 'class-validator';

export class CreatePeminjamanDto {
  @IsInt({ message: 'bukuId harus angka' })
  bukuId: number;
}
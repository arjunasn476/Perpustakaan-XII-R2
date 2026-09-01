import { IsInt, IsNotEmpty, Min, IsOptional } from 'class-validator';

export class CreateBukuDto {
  @IsNotEmpty({ message: 'Judul tidak boleh kosong' })
  judul: string;

  @IsNotEmpty({ message: 'Penulis tidak boleh kosong' })
  penulis: string;

  @IsInt({ message: 'Stok harus angka bulat' })
  @Min(0, { message: 'Stok tidak boleh negatif' })
  stok: number;
}

export class UpdateBukuDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Judul tidak boleh kosong' })
  judul?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Penulis tidak boleh kosong' })
  penulis?: string;

  @IsOptional()
  @IsInt({ message: 'Stok harus angka bulat' })
  @Min(0, { message: 'Stok tidak boleh negatif' })
  stok?: number;
}
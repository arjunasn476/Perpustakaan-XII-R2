export class CreateBukuDto {
  judul: string;
  penulis: string;
  stok: number;
}

export class UpdateBukuDto {
  judul?: string;
  penulis?: string;
  stok?: number;
}
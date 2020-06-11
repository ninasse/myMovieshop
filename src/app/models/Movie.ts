export default class Movie {
  Id: number;
  Title: string;
  Descr: string;
  ImgUrl: string;
  ReleaseYear: number;
  // Category: [{ CatId: number }];
  Price: number;
}

export class ProductCategory {
  categoryId: number;
  category: string;
}

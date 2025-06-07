export interface CloudinaryImageTypes {
  url: string;
  public_id: string;
}

export interface IProducts {
  title: string;
  caption: string;
  price: number;
  image: CloudinaryImageTypes;
  category: string;
}

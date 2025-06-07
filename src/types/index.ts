export interface CloudinaryImageTypes {
  url: string;
  public_id: string;
}
export interface IReview {
  email: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}
export interface IProducts {
  title: string;
  caption: string;
  price: number;
  image: CloudinaryImageTypes;
  category: string;
  reviews?: IReview[];
}

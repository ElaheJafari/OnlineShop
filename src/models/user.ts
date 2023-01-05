export interface User {
  _id: string;
  username: string;
  email: string;
  mobile: string;
  isAdmin: boolean;
  image: string;
  token: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  age?: string;
  city?: string;
}

export interface UserCompany {
  department: string;
  name: string;
}

export interface UserAddress {
  city: string;
  postalCode: string;
  state: string;
}

export interface User {
  id: number | null;
  image: string;
  email: string;
}

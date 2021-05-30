export interface ICustomerWithId {
  pk: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
}

export interface ICustomer {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
}

export interface IResult {
  data: ICustomerWithId[];
  nextlink: string;
}

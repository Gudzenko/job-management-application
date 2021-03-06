export interface ICustomerWithId {
  pk: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  description: string;
}

export interface ICustomer {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  description: string;
}

export interface IResponce {
  data: IResult;
}

export interface IResult {
  data: ICustomerWithId[];
  nextlink: string;
}

export interface IResponceSingle {
  data: ICustomerWithId;
}

export interface IResultRequest {
  data: any;
}

export interface IOperationResult {
  id: number;
  operation: string;
  status: string;
}

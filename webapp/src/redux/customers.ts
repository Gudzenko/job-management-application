import { createSlice } from "@reduxjs/toolkit";
import { ICustomerWithId, IOperationResult } from "../Customer/types";

interface IInitState {
  customers: ICustomerWithId[];
  customer: ICustomerWithId;
  nextPageURL: string;
  result: IOperationResult;
}

const initialState: IInitState = {
  customers: [],
  nextPageURL: "",
  customer: {
    pk: 0,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  },
  result: {
    id: 0,
    operation: "",
    status: "",
  },
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setNextPageUrl: (state, action) => {
      state.nextPageURL = action.payload;
    },
    deleteCustomerById: (state, action) => {
      const newCustomers = state.customers.filter(
        (obj: ICustomerWithId) => obj.pk !== action.payload
      );
      state.customers = newCustomers;
    },
    setOperationStatus: (state, action) => {
      state.result.id += 1;
      state.result.operation = action.payload.operation;
      state.result.status = action.payload.status;
    },
  },
});

export const {
  setCustomers,
  setCustomer,
  setNextPageUrl,
  deleteCustomerById,
  setOperationStatus,
} = customersSlice.actions;

export default customersSlice.reducer;

export type CustomersReducer = IInitState;

import axios from "axios";
import {
  ICustomer,
  ICustomerWithId,
  IResponce,
  IResponceSingle,
  IResultRequest,
} from "../Customer/types";
import {
  setCustomers,
  setCustomer,
  setNextPageUrl,
  deleteCustomerById,
  setOperationStatus,
} from "../redux/customers";
import { Dispatch } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000";

export const getCustomers = () => async (dispatch: Dispatch) => {
  const url = `${API_URL}/api/customers/`;
  axios.get<string, IResponce>(url).then((response: IResponce) => {
    dispatch(setCustomers(response.data.data));
    dispatch(setNextPageUrl(response.data.nextlink));
  });
};

export const getCustomersByURL =
  (link: string) => async (dispatch: Dispatch) => {
    const url = `${API_URL}${link}`;
    axios.get<string, IResponce>(url).then((response: IResponce) => {
      dispatch(setCustomers(response.data.data));
      dispatch(setNextPageUrl(response.data.nextlink));
    });
  };

export const getCustomer = (pk: number) => async (dispatch: Dispatch) => {
  const url = `${API_URL}/api/customers/${pk}`;
  axios.get<string, IResponceSingle>(url).then((response: IResponceSingle) => {
    console.log(response);
    dispatch(setCustomer(response.data));
  });
};

export const deleteCustomer = (pk: number) => async (dispatch: Dispatch) => {
  const url = `${API_URL}/api/customers/${pk}`;
  axios.delete<string, IResultRequest>(url).then((response: IResultRequest) => {
    dispatch(deleteCustomerById(pk));
  });
};

export const createCustomer =
  (customer: ICustomer) => async (dispatch: Dispatch) => {
    const url = `${API_URL}/api/customers/`;
    axios
      .post<string, IResultRequest>(url, customer)
      .then(() => {
        dispatch(
          setOperationStatus({ operation: "create customer", status: "done" })
        );
      })
      .catch(() => {
        dispatch(
          setOperationStatus({ operation: "create customer", status: "error" })
        );
      });
  };

export const updateCustomer =
  (customer: ICustomerWithId) => async (dispatch: Dispatch) => {
    const url = `${API_URL}/api/customers/${customer.pk}`;
    axios
      .put<string, IResultRequest>(url, customer)
      .then(() => {
        dispatch(
          setOperationStatus({ operation: "update customer", status: "done" })
        );
      })
      .catch(() => {
        dispatch(
          setOperationStatus({ operation: "update customer", status: "error" })
        );
      });
  };

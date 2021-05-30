import axios from "axios";
import { ICustomer, ICustomerWithId } from "./types";
const API_URL = "http://localhost:8000";

export default class CustomersService {
  getCustomers() {
    const url = `${API_URL}/api/customers/`;
    return axios.get(url).then((response) => response.data);
  }
  getCustomersByURL(link: string) {
    const url = `${API_URL}${link}`;
    return axios.get(url).then((response) => response.data);
  }
  getCustomer(pk: number) {
    const url = `${API_URL}/api/customers/${pk}`;
    return axios.get(url).then((response) => response.data);
  }
  deleteCustomer(pk: number) {
    const url = `${API_URL}/api/customers/${pk}`;
    return axios.delete(url);
  }
  createCustomer(customer: ICustomer) {
    const url = `${API_URL}/api/customers/`;
    return axios.post(url, customer);
  }
  updateCustomer(customer: ICustomerWithId) {
    const url = `${API_URL}/api/customers/${customer.pk}`;
    return axios.put(url, customer);
  }
}

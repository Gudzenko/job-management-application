import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ICustomerWithId } from "./types";
import {
  getCustomers,
  getCustomersByURL,
  deleteCustomer,
} from "../redux/actions";
import { RootState } from "../redux/store";

const CustomersList: React.FC<any> = (props) => {
  const customers = useSelector<RootState, ICustomerWithId[]>(
    (state: RootState) => state.customers.customers
  );
  const nextPageURL = useSelector<RootState, string>(
    (state: RootState) => state.customers.nextPageURL
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleDelete = (e: any, pk: number) => {
    dispatch(deleteCustomer(pk));
  };

  const nextPage = () => {
    dispatch(getCustomersByURL(nextPageURL));
  };

  return (
    <div className="customers--list">
      <table className="table">
        <thead key="thead">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c: ICustomerWithId) => (
            <tr key={c.pk}>
              <td>{c.pk} </td>
              <td>{c.first_name}</td>
              <td>{c.last_name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.address}</td>
              <td>{c.description}</td>
              <td>
                <button onClick={(e) => handleDelete(e, c.pk)}> Delete</button>
                <a href={"/customer/" + c.pk}> Update</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};
export default CustomersList;

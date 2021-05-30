import React from "react";
import CustomersService from "./CustomersService";
import { ICustomerWithId, IResult } from "./types";

const customersService = new CustomersService();

interface IState {
  customers: ICustomerWithId[];
  nextPageURL: string;
}

class CustomersList extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      customers: [],
      nextPageURL: "",
    };
  }

  componentDidMount() {
    customersService
      .getCustomers()
      .then((result: IResult) =>
        this.setState({ customers: result.data, nextPageURL: result.nextlink })
      );
  }

  handleDelete(e: any, pk: number) {
    customersService.deleteCustomer(pk).then(() => {
      const newArr = this.state.customers.filter(
        (obj: ICustomerWithId) => obj.pk !== pk
      );
      this.setState({ customers: newArr });
    });
  }

  nextPage() {
    customersService
      .getCustomersByURL(this.state.nextPageURL)
      .then((result: IResult) =>
        this.setState({ customers: result.data, nextPageURL: result.nextlink })
      );
  }

  render() {
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
            {this.state.customers.map((c: ICustomerWithId) => (
              <tr key={c.pk}>
                <td>{c.pk} </td>
                <td>{c.first_name}</td>
                <td>{c.last_name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.address}</td>
                <td>{c.description}</td>
                <td>
                  <button onClick={(e) => this.handleDelete(e, c.pk)}>
                    {" "}
                    Delete
                  </button>
                  <a href={"/customer/" + c.pk}> Update</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={this.nextPage}>
          Next
        </button>
      </div>
    );
  }
}
export default CustomersList;

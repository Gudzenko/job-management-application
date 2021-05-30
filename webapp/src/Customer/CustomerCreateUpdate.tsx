import React from "react";
import CustomersService from "./CustomersService";
import { ICustomerWithId } from "./types";

const customersService = new CustomersService();

interface IState {
  customer: ICustomerWithId;
}

interface IProps {
  match: any;
}

class CustomerCreateUpdate extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      customer: {
        pk: 0,
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        description: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    if (params && params.pk) {
      customersService.getCustomer(params.pk).then((c: ICustomerWithId) => {
        this.setState({ customer: c });
      });
    }
  }

  handleCreate() {
    const { customer } = this.state;
    customersService
      .createCustomer({
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        description: customer.description,
      })
      .then((result: any) => {
        alert("Customer created!");
      })
      .catch(() => {
        alert("There was an error! Please re-check your form.");
      });
  }
  handleUpdate(pk: number) {
    const { customer } = this.state;
    customersService
      .updateCustomer({
        pk: pk,
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        description: customer.description,
      })
      .then((result: any) => {
        alert("Customer updated!");
      })
      .catch(() => {
        alert("There was an error! Please re-check your form.");
      });
  }
  handleSubmit(event: any) {
    const {
      match: { params },
    } = this.props;

    if (params && params.pk) {
      this.handleUpdate(params.pk);
    } else {
      this.handleCreate();
    }
    event.preventDefault();
  }

  onChange(value: string, tag: string) {
    let { customer } = this.state;
    switch (tag) {
      case "first_name":
        customer.first_name = value;
        break;
      case "last_name":
        customer.last_name = value;
        break;
      case "phone":
        customer.phone = value;
        break;
      case "email":
        customer.email = value;
        break;
      case "address":
        customer.address = value;
        break;
      case "description":
        customer.description = value;
        break;
    }
    this.setState({ customer });
  }

  render() {
    const { customer } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            className="form-control"
            type="text"
            value={customer.first_name}
            onChange={(e) => this.onChange(e.target.value, "first_name")}
          />

          <label>Last Name:</label>
          <input
            className="form-control"
            type="text"
            value={customer.last_name}
            onChange={(e) => this.onChange(e.target.value, "last_name")}
          />

          <label>Phone:</label>
          <input
            className="form-control"
            type="text"
            value={customer.phone}
            onChange={(e) => this.onChange(e.target.value, "phone")}
          />

          <label>Email:</label>
          <input
            className="form-control"
            type="text"
            value={customer.email}
            onChange={(e) => this.onChange(e.target.value, "email")}
          />

          <label>Address:</label>
          <input
            className="form-control"
            type="text"
            value={customer.address}
            onChange={(e) => this.onChange(e.target.value, "address")}
          />

          <label>Description:</label>
          <textarea
            className="form-control"
            value={customer.description}
            onChange={(e) => this.onChange(e.target.value, "description")}
          ></textarea>

          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default CustomerCreateUpdate;

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getCustomer, createCustomer, updateCustomer } from "../redux/actions";
import { ICustomerWithId } from "./types";

interface IProps {
  match: any;
}

const CustomerCreateUpdate = (props: IProps) => {
  const customer = useAppSelector((state) => state.customers.customer);
  const result = useAppSelector((state) => state.customers.result);
  const [cust, setCust] = useState<ICustomerWithId>({
    pk: 0,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const {
    match: { params },
  } = props;

  useEffect(() => {
    if (params && params.pk) {
      dispatch(getCustomer(params.pk));
    }
  }, [dispatch, params]);

  useEffect(() => {
    setCust(customer);
  }, [customer]);

  useEffect(() => {
    if (result.status === "error") {
      alert("There was an error! Please re-check your form.");
    } else if (
      result.status === "done" &&
      result.operation === "create customer"
    ) {
      alert("Customer created!");
    } else if (
      result.status === "done" &&
      result.operation === "update customer"
    ) {
      alert("Customer updated!");
    }
  }, [result]);

  const handleCreate = () => {
    dispatch(createCustomer(cust));
  };
  const handleUpdate = () => {
    dispatch(updateCustomer(cust));
  };
  const handleSubmit = () => {
    if (params && params.pk) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const onChange = (value: string, tag: string) => {
    let newCustomer = { ...cust };
    switch (tag) {
      case "first_name":
        newCustomer.first_name = value;
        break;
      case "last_name":
        newCustomer.last_name = value;
        break;
      case "phone":
        newCustomer.phone = value;
        break;
      case "email":
        newCustomer.email = value;
        break;
      case "address":
        newCustomer.address = value;
        break;
      case "description":
        newCustomer.description = value;
        break;
    }
    setCust(newCustomer);
  };
  return (
    <div>
      <div className="form-group">
        <label>{t("first_name")}:</label>
        <input
          className="form-control"
          type="text"
          value={cust.first_name}
          onChange={(e) => onChange(e.target.value, "first_name")}
        />

        <label>{t("last_name")}:</label>
        <input
          className="form-control"
          type="text"
          value={cust.last_name}
          onChange={(e) => onChange(e.target.value, "last_name")}
        />

        <label>{t("phone")}:</label>
        <input
          className="form-control"
          type="text"
          value={cust.phone}
          onChange={(e) => onChange(e.target.value, "phone")}
        />

        <label>{t("email")}:</label>
        <input
          className="form-control"
          type="text"
          value={cust.email}
          onChange={(e) => onChange(e.target.value, "email")}
        />

        <label>{t("address")}:</label>
        <input
          className="form-control"
          type="text"
          value={cust.address}
          onChange={(e) => onChange(e.target.value, "address")}
        />

        <label>{t("description")}:</label>
        <textarea
          className="form-control"
          value={cust.description}
          onChange={(e) => onChange(e.target.value, "description")}
        ></textarea>

        <button className="btn btn-primary" onClick={handleSubmit}>
          {t("button_submit")}
        </button>
      </div>
    </div>
  );
};

export default CustomerCreateUpdate;

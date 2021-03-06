import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { ICustomerWithId } from "./types";
import {
  getCustomers,
  getCustomersByURL,
  deleteCustomer,
} from "../redux/actions";

const CustomersList = () => {
  const customers = useAppSelector((state) => state.customers.customers);
  const nextPageURL = useAppSelector((state) => state.customers.nextPageURL);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");

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
            <th>{t("number")}</th>
            <th>{t("first_name")}</th>
            <th>{t("last_name")}</th>
            <th>{t("phone")}</th>
            <th>{t("email")}</th>
            <th>{t("address")}</th>
            <th>{t("description")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c: ICustomerWithId) => (
            <tr key={c.pk}>
              <td>{c.pk} </td>
              <td>{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.address}</td>
              <td>{c.description}</td>
              <td>
                <button onClick={(e) => handleDelete(e, c.pk)}>
                  {t("button_delete")}
                </button>
                <Link to={"/customer/" + c.pk}>{t("button_update")}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={nextPage}>
        {t("button_next")}
      </button>
    </div>
  );
};
export default CustomersList;

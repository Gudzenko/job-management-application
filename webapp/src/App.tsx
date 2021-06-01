import { BrowserRouter, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomersList from "./Customer/CustomersList";
import CustomerCreateUpdate from "./Customer/CustomerCreateUpdate";
import "./App.css";

const App = () => {
  const { t, i18n } = useTranslation("common");
  const langs = ["en", "pl", "ru"];
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-brand">{t("header")}</div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/">
                {t("customers")}
              </Link>
              <Link className="nav-item nav-link" to="/customer">
                {t("create_customer")}
              </Link>
            </div>
          </div>
          <div>
            {langs.map((lang) => (
              <button
                className="btn lang"
                onClick={() => i18n.changeLanguage(lang)}
                key={lang}
              >
                {lang}
              </button>
            ))}
          </div>
        </nav>
        <div className="content">
          <Route path="/" exact component={CustomersList} />
          <Route path="/customer/:pk" component={CustomerCreateUpdate} />
          <Route path="/customer/" exact component={CustomerCreateUpdate} />
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;

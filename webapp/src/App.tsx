import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CustomersList from "./Customer/CustomersList";
import CustomerCreateUpdate from "./Customer/CustomerCreateUpdate";
import "./App.css";

const BaseLayout = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand">Django React Demo</div>
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
          <a className="nav-item nav-link" href="/">
            CUSTOMERS
          </a>
          <a className="nav-item nav-link" href="/customer">
            CREATE CUSTOMER
          </a>
        </div>
      </div>
    </nav>
    <div className="content">
      <Route path="/" exact component={CustomersList} />
      <Route path="/customer/:pk" component={CustomerCreateUpdate} />
      <Route path="/customer/" exact component={CustomerCreateUpdate} />
    </div>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
    );
  }
}
export default App;

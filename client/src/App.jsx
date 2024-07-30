// to include: TopNavBar, Footer, conditionally render: Homepage, Dashboard
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <TopNavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;

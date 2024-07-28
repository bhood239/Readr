// to include: TopNavBar, Footer, conditionally render: Homepage, Dashboard
import React, { Component, useState } from "react";
import "./App.css";
import Navbar from 'react-bootstrap/Navbar';
import TopNavBar from "./components/TopNavBar";
import Dashboard from './routes/Dashboard.jsx';
import Profile from './routes/Profile.jsx';
import HomePage from './routes/Homepage.jsx';
import Footer from './components/Footer.jsx';

const routes = {
  dashboard: Dashboard,
  profile: Profile,
  homepage: HomePage,
  
}
 
const App = () => {

 const [currentPage, setCurrentPage] = useState('dashboard');

 const CurrentPage = routes[currentPage];


    return (
      <div className="App">
        <TopNavBar setCurrentPage={setCurrentPage}/>
        <CurrentPage />
        <Footer/>



        {/* <h1>{this.state.message}</h1>
        <button onClick={this.fetchData}>Fetch Data</button> */}
      </div>
    );
  };
 

export default App;

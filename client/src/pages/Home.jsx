/*import React from 'react'

export default function Home() {
  return (
    <div>Home</div>
  )
}*/
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import "./home.css";
import Featured from "../components/Featured.jsx";
import PropertyList from "../components/PropertyList.jsx"
import FeaturedProperties from "../components/FeaturedProperties.jsx";
import MailList from "../components/MailList.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;

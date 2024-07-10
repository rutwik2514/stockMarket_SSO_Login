import React, { useEffect, useState } from "react";
import "./Home.css";
import StockImg from "../../Assets/stock.svg";

import Navbar from "../../Utilis/Navbar/Navbar";

const Home = () => {

  return (
    <>
      <Navbar />

      <div style={{ width: "100vw", display: "flex", justifyContent: "flex-end" }}>

      </div>
      <section style={{ height: "90vh", width: "100vw" }} className="row">
        <div className="col-5 p-5 textDiv" style={{ marginTop: "-50px", height: "90vh", display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <h1 style={{ backgroundImage: 'linear-gradient(90deg, rgba(147,61,234,1) 0%, rgba(116,72,228,1) 49%, rgba(173,119,228,1) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontWeight: "bold" }}>
            Skill up and practice zero-risk trading on our free TradeWise account.
          </h1>
          <h4 style={{ fontWeight: "bold", backgroundClip: 'text' }}>
            New to trading and a bit hesitant? Our TradeWise account is the perfect way to explore all of our instruments and test your trading strategies using entirely virtual funds - with zero risk.
          </h4>
        </div>
        <div className="col-7 animationDiv" style={{ height: "90vh", display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <img src={StockImg} className="stockImg" alt="Stock" />
        </div>
      </section>
    </>
  );
};

export default Home;

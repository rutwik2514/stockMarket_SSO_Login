 /* eslint-disable */

import './Navbar.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi2";

function Sidebar_responsive() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);
  const handleLocalLogout = () => {
    // Remove local storage items or tokens
    localStorage.removeItem("user");
    navigate("/sign-in");
  };
  const handleClickOutside = (event) => {
    // Checks if click is not on sidebar
    if (sidebar && !document.querySelector('.sidebar-menu').contains(event.target) && !document.querySelector('.sidebar-icons').contains(event.target)) {
      setSidebar(false);
    }
  };

  useEffect(() => {
    if (sidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [sidebar]);

  return (
    <>
      <div className='navbar' style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", backgroundColor:"#f5ecfe" }}>
          <Link to='#' className='sidebar-icons' style={{ marginLeft: "-10px", backgroundColor:"#f5ecfe" }}>
            <FaBars onClick={showSidebar} style={{ fontSize: '3.5vh', marginBottom:"6px", color:"black" }} />
          </Link>
          <h5 className="text-3xl font-bold" style={{ marginLeft: "10px", backgroundColor:"#f5ecfe" }}>
            TradeWise
          </h5>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor:"#f5ecfe"
          }}
          onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
        >
          <CiLogout style={{ marginBottom: "5px", marginRight: "5px", backgroundColor:"#f5ecfe"}} />
          <h5 className="text-l font-bold" style={{ textAlign: "center", textDecoration: "none", backgroundColor:"#f5ecfe" }} onClick={handleLocalLogout}>
            Logout
          </h5>
        </div>
      </div>
      <nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'} style={{border:"1px solid purple"}}>
        <ul className='sidebar-menu-items' onClick={showSidebar}>
          <li className='sidebar-toggle' >
            <Link to='#' className='sidebar-icons'>
              <IoMdClose style={{color:"purple"}} />
            </Link>
          </li>
          <li className="list-items">
            <Link to='/home'>
              <FaHome style={{color:"purple"}} />
              <span style={{ color: "purple" }}>Home</span>
            </Link>
          </li>
          <li className="list-items">
            <Link to='/buy'>
              <HiCurrencyRupee style={{color:"purple"}} />
              <span style={{ color: "black" }}>Buy</span>
            </Link>
          </li>
          <li className="list-items">
            <Link to='/sell'>
              <MdSell style={{color:"purple"}} />
              <span style={{ color: "black" }}>Sell</span>
            </Link>
          </li>
          <li className="list-items">
            <Link to='/profile'>
              <FaRegUserCircle style={{color:"purple"}} />
              <span style={{ color: "black" }}>Profile</span>
            </Link>
          </li>
          <li className="list-items">
            <Link to='/analysis'>
              <BsGraphUp style={{color:"purple"}} />
              <span style={{ color: "black" }}>Analysis</span>
            </Link>
          </li>
          <li className="list-items">
            <Link to='/news'>
              <FaRegNewspaper style={{color:"purple"}} />
              <span style={{ color: "black" }}>News</span>
            </Link>
          </li>
          <li className="list-items">
            <Link to='/logout'>
              <CiLogout style={{color:"purple"}} />
              <span style={{ color: "black" }}>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar_responsive;

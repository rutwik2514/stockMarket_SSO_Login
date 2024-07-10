 /* eslint-disable */
import React from "react";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";
import {  FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <div className="bg-[#f5ecfe]" style={{maxWidth:"100vw"}}>
            <footer style={{maxWidth:"100vw"}} className="footer bg-[#f5ecfe]">
                <div className="container bg-[#f5ecfe]">
                    <div className="row bg-[#f5ecfe] justify-content-center" style={{padding:"0"}}>
                        <div className="col-md-12 bg-[##f5ecfe] text-center" style={{margin:"0",padding:"0"}} >
                            <h2 className="footer-heading bg-[#f5ecfe] text-3xl font-extrabold"><a href="/home" className="bg-[#f5ecfe]  ">TradeWise</a></h2>
                            <p className="menu bg-[#f5ecfe]" style={{margin:0, paddingBottom:"15px"}}>
                                <a href="/home" className="bg-[#f5ecfe] ">Home</a>
                             
                                <a href="/sell" className="bg-[#f5ecfe]">Sell</a>
                                <a href="/buy" className="bg-[#f5ecfe]">Buy</a>
                                <a href="/contactUs" className="bg-[#f5ecfe]">Contact Us</a>
                            </p>
                            <ul className="display flex items-center justify-center gap-4 bg-[#f5ecfe] p-0"  style={{margin:0, paddingBottom:"15px"}}>
                                <li className=" bg-[#f5ecfe]"><a href="https://github.com/Pranjalidhale0711" ><FaGithub   style={{background:"#f5ecfe"}} /></a></li>
                                <li className=" bg-[#f5ecfe]"><a href="https://www.linkedin.com/in/pranjali123/"  ><FaLinkedin  style={{background:"#f5ecfe"}} /></a></li>
                                <li className=" bg-[#f5ecfe]"><a href="https://www.instagram.com/"  ><FaInstagram  style={{background:"#f5ecfe"}} /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-3 bg-[#f5ecfe]">
                        <div className="col-md-12 text-center bg-[#f5ecfe]">
                            <p className="bg-[#f5ecfe] copyright">
                                Copyright © All rights reserved <i className=" bg-[#f5ecfe]" aria-hidden="true" /> <a href="#" target="_blank" className="bg-[#f5ecfe]">TradeWise</a></p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
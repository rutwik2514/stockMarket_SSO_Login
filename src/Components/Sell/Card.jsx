import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {  toast } from "react-toastify";
import {  getStock, handleSell } from "../../Api/trade";

import "./Card.css"
function Card({ stockName, stockQuantity }) {
  const navigate = useNavigate();
  const [sellQuantity, setSellQuantity] = useState(0);
  const [showSellInput, setShowSellInput] = useState(false);
  const [stockInfo, setStockInfo] = useState(null);



  const handleGetdetails = () => {
    navigate(`/specificStockAnalysis/${stockName}`);
  };

  const handleSellStocks = async () => {
    console.log(`Selling ${stockQuantity} stocks of ${stockName}`);
    if (showSellInput === false) setShowSellInput(true);
    else setShowSellInput(false);
    try {
      const response = await getStock(stockName);
      console.log("heeree");
      console.log(response.stockInfo[0]);
      setStockInfo(response.stockInfo[0]);
    } catch (e) {
      console.log(e);
    }//  console.log()
  };

  const handleConfirmSell = async () => {
    console.log("handle confirm sell", sellQuantity);
    if (sellQuantity > stockQuantity) {
      toast.error("Dont have enough Stocks to Sell");
      return;
    }
    try {
      const response = await handleSell(stockName, sellQuantity,stockInfo.low);
      console.log("response is", response)
      if (response?.error == null) {
        toast.success("Portfolio Updated Successfully");
        setTimeout(() => {
          navigate("/profile")
        }, 3000);
      } else {
        toast.error(response.error);
      }
    } catch (e) {
      toast.error("Something Error Occured");
    }
  };
  return (
   <>
    <tr>
      <td className="border-1 border-slate-900 ...  text-sm p-2">
        {stockName}
      </td>
      <td className="border-1 border-slate-900 ... p-2">{stockQuantity}</td>
      <td className="border-1 border-slate-900 ...">
        <button
          onClick={()=>handleGetdetails()}
          className="display-flex items-center m-1 px-2 py-1   justify-center text-center text-white bg-[#7743DB]  rounded-lg hover:bg-blue-800"
        >
          Get Details
        </button>
      </td>
      <td className="border-1 border-slate-900 ...">
       {!showSellInput &&( <button
          onClick={()=>handleSellStocks()}
          className="inline-flex items-center m-1 px-2 py-1  text-center text-white  bg-[#7743DB] rounded-lg hover:bg-blue-800 "
        >
          Sell Stocks
        </button>)}
        
        {showSellInput && (
        <tr className="  ">
          <td  className="">
            <div className="flex items-center justify-center" id="rowDiv"  >
              {stockInfo && (
                  <div className=" ml-2 mr-2  items-center justify-center ">
                   Price: {stockInfo.low}
                  </div>
              )}
              <input
                type="number"
                placeholder="Quantity"
                onChange={(e) => {
                  setSellQuantity(e.target.value);
                }}
                style={{width:"7vw"}}
                id="quantityDiv"
                className="border-2 mr-2 border-gray-300  rounded-md px-2 py-1 "
              />
              <button
                onClick={handleConfirmSell}
                className="bg-green-500 text-white  text-center px-2 py-1 rounded-md hover:bg-green-600 "
              >
                Confirm Sell
              </button>
            </div>
          </td>
        </tr>
      )}
        </td>
       
        </tr>
     
        </>
  
      
  );
}
export default Card;

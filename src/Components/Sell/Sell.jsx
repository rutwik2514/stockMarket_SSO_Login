import React, { useEffect, useState } from "react";
import { getStockData } from "../../Api/trade.js";
import Card from "./Card.jsx";
import Navbar from "../../Utilis/Navbar/Navbar";


export default function Sell() {
  const [userStockInfo, setUserStockInfo] = useState([]);

  useEffect(() => {
    const func = async () => {
      try {
        const data = await getStockData();
        console.log("selling");
        // console.log(data?.portfolio_user?.portfolio_user);
        setUserStockInfo(data?.portfolio_user?.portfolio_user);
      } catch (e) {
        console.log(e);
      }
    };
    func();
  }, []);
  return (
    <>
    <Navbar/>
   
      <h1 className="text-5xl  my-3 flex font-extrabold mb-4 text-[#111a6f] justify-center items-center">Sell Stocks</h1>

       <table className="mx-auto border-collapse border w-screen max-w-screen-lg border-slate-500 ...">
             <thead>
             <tr>
            <th className="border-1 border-slate-900 ... p-2 " style={{ height: '60px' }} >Stock Name</th>
            <th className="border-1 border-slate-900 ... p-2" style={{ height: '60px' }}>Stock Quantity</th>
            <th className="border-1 border-slate-900 ... p-2" style={{ height: '60px' }}>Get Details</th>
            <th className="border-1 border-slate-900 ... p-2" style={{ height: '60px' }}>Sell Stock</th>
          </tr>
        </thead>
        <tbody>
          {userStockInfo?.portfolio?.map((stock, index) => (
            <Card
              key={index}
              stockName={stock.stockName}
              stockQuantity={stock.stockRemainigQuantity}
            />
          ))}
        </tbody>
        </table>
         </>
  );
}
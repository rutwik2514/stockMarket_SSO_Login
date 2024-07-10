import React, { useEffect, useState } from "react";
import { getStockData, getUserDetails } from "../../Api/trade";
import Navbar from "../../Utilis/Navbar/Navbar";
import { CgProfile } from "react-icons/cg";
import { MdAttachMoney } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import Footer from "../../Utilis/Footer/Footer";

export default function Profile() {
  const [userData, setUserData] = useState({
    userName: "",
    balance: 0,
    arraySell: [],
    arrayBuy: [],
  });

  const fetchData = async () => {
    try {
      const userRes = await getUserDetails();
      const stockRes = await getStockData();
      const userName = userRes.response.userName;
      const userStockInfo = stockRes?.portfolio_user?.portfolio_user || {};
      const balance = userStockInfo.balance || 0;
      const newArrayBuy = [];
      const newArraySell = [];

      userStockInfo.portfolio?.forEach((filteredStock) => {
        filteredStock.stockBuyingPrice.forEach((singleStock) => {
          newArrayBuy.push({
            stockName: filteredStock.stockName,
            Quantity: singleStock.stockBuyQuantity,
            Date: new Date(singleStock.stockBuyDate),
            Price: singleStock.stockBuyPrice,
            Type: "Buy",
          });
        });
        filteredStock.stockSell.forEach((singleStock) => {
          newArraySell.push({
            stockName: filteredStock.stockName,
            Quantity: singleStock.stockSellQuantity,
            Date: new Date(singleStock.stockSellDate.replace(" ", "T")),
            Price: singleStock.stockSellPrice,
            Type: "Sell",
          });
        });
      });

      newArraySell.sort((a, b) => new Date(b.Date) - new Date(a.Date));
      newArrayBuy.sort((a, b) => new Date(b.Date) - new Date(a.Date));

      setUserData({
        userName,
        balance,
        arraySell: newArraySell,
        arrayBuy: newArrayBuy,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { userName, balance, arraySell, arrayBuy } = userData;

  return (
    <>
      <Navbar />
      <section>
        <div
          className="row text-[#111a6f] font-extrabold text-5xl  flex items-center justify-center"
          style={{ height: "10vh", marginLeft: "0px" }}
        >
          Your Profile
        </div>
        <div className="row" style={{ minHeight: "20vh", marginLeft: "0px" }}>
          <ProfileInfo icon={<CgProfile style={{ backgroundColor: "#cfb1ee"}} />} label="Username:" value={userName} />
          <ProfileInfo icon={<MdAttachMoney style={{ backgroundColor: "#cfb1ee"}} />} label="Balance:" value={balance.toFixed(2)} />
          <ProfileInfo
            icon={<GiReceiveMoney style={{ backgroundColor: "#cfb1ee"}} />}
            label={balance > 1000 ? "Profit:" : "Loss:"}
            value={Math.abs(1000 - balance).toFixed(2)}
          />
        </div>
        <div className="row" style={{ minHeight: "50vh" }}>
          <StockTable title="Buy Transactions" stocks={arrayBuy} />
          <StockTable title="Sell Transactions" stocks={arraySell} />
        </div>
      </section>
      <Footer />
    </>
  );
}

const ProfileInfo = ({ icon, label, value }) => (
  <div
    className="col-md-4"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    }}
  >
    <div
      className="box text-2xl flex items-center justify-center"
      style={{
        backgroundColor: "#cfb1ee",
        height: "12vh",
        width: "80%",
        border: "2px solid #2a0052",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{ width: "50%", backgroundColor: "transparent" }}
      >
        {icon}
      </div>
      <div className="flex flex-col" style={{ width: "50%", backgroundColor: "#cfb1ee" }}>
        <div className="font-bold" style={{ backgroundColor: "#cfb1ee" }}>
          {label}
        </div>
        <div style={{ backgroundColor: "#cfb1ee" }}>{value}</div>
      </div>
    </div>
  </div>
);

const StockTable = ({ title, stocks }) => (
  <div className="col-md-6">
    <h3 className="text-center text-2xl mb-4">{title}</h3>
    {stocks.length === 0 ? (
      <p className="text-center text-gray-700">No transactions yet</p>
    ) : (
      <table className="bg-white rounded-lg shadow-md ml-10">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-700">Sr.No</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-700">Stock Name</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-700">Date</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-700">Quantity</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-700">Price</th>
            <th className="py-2 px-4 bg-gray-200 text-gray-700">Type</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4 text-center">{index + 1}</td>
              <td className="py-2 px-4 text-center">{item.stockName}</td>
              <td className="py-2 px-4 text-center">{new Date(item.Date).toLocaleDateString()}</td>
              <td className="py-2 px-4 text-center">{item.Quantity}</td>
              <td className="py-2 px-4 text-center">{item.Price}</td>
              <td className="py-2 px-4 text-center">
                <span
                  className={`px-2 py-1 text-center rounded ${
                    item.Type === "Sell" ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"
                  }`}
                >
                  {item.Type}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
   
  </div>
);

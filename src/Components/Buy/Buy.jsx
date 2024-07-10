import React, { useState } from "react";
import { buyStock, getMonthlyData, getStock } from "../../Api/trade";

import { ToastContainer, toast } from "react-toastify";
// import { ChartDisplay } from "../../Utilis/Charts/CandleStick";
import { CandlestickChart } from "../../Utilis/Charts/CandleStick";
import Lottie from "lottie-react"
import animation from "../../Assets/Buy.json"
import Loader from "../../Utilis/Loader/Loader";

import Navbar from "../../Utilis/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../Utilis/Footer/Footer";

function Buy() {
  const [stockName, setStockName] = useState("");
  const [stockInfo, setStockInfo] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();
  const [gettingDetails, setGettingDetails] = useState(false);

  const chartOptions = {
    title: "Price vs Date",
    hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    backgroundColor: 'transparent',
    chartArea: { width: "90%", height: "80%" },
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#f6465d" }, // red
      risingColor: { strokeWidth: 0, fill: "#0ccb80" }, // green
    },
    colors: ["#808080"],
    explorer: {
      maxZoomout: 2,
      keepInBounds: true,
    },
  };


  const handleSubmit = async () => {
    try {
      setGettingDetails(true);
      const response = await getStock(stockName);
      console.log("reponse for stock is", response)
      setStockInfo(response.stockInfo[0]);
      try {
        const res = await getMonthlyData(stockName);
        const graphData = [
          ["date", "low", "open", "close", "high"],
        ];
        res.startingEntries.map((item) => {
          let temp = [];
          temp.push(item.date.slice(0, 10));
          temp.push(item.low);
          temp.push(item.open);
          temp.push(item.close);
          temp.push(item.high);
          graphData.push(temp);
          return temp
        })
        console.log("graph data is", graphData);
        setChartData(graphData);
        setGettingDetails(false);
      } catch (e) {
        console.log("Something went wrong", e.message);
      }
    } catch (e) {
      console.log(e);
    }
    
  };
  const handleBuyStock = async () => {
    try {
      const res = await buyStock(stockName, stockInfo.low, stockQuantity);
      toast.success(res.message);
      navigate("/profile")

      // console.log(res);
    } catch (e) {
      toast.error("Stock could not be Purchased");
      // console.log(e);
    }

  };

  return (

    <>
      <Navbar />

      <div style={{ width: "100vw", display: "flex", justifyContent: "flex-end" }}>

      </div>
      <section style={{ minHeight: "100vh", width: "100vw" }} className="row">
        <div className="col-md-6" style={{ marginTop: "20px" }}>
          <div className="flex flex-col w-full items-center p-4">
            <div className="w-full max-w-md flex-grow p-4">
              <div className="text-[#111a6f] font-extrabold text-5xl  flex items-center justify-center">Buy Stocks</div>
              <div className="flex flex-col sm:flex-row  my-7 justify-center items-center">
                <input
                  className="border-2 border-lightpurple bg-purple-100 p-2.5 rounded-md mb-2 sm:mb-0 sm:mr-2 w-full sm:w-48"
                  placeholder="Enter Stock Name"
                  onChange={(e) => setStockName(e.target.value)}
                />
                <button
                  className="p-2.5 bg-[#7743DB] text-white rounded-lg hover:bg-[#C3ACD0] hover:text-black mb-2 sm:mb-0 w-full sm:w-48"
                  onClick={handleSubmit}
                >
                  Get Details
                </button>
              </div>
              {gettingDetails && <center><div ><Loader /></div></center>}
              <div className="flex justify-center items-center mt-4">
                {stockInfo && !gettingDetails && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <div className="text-black grid grid-cols-2 grid-rows-2 gap-5 p-4 rounded-md w-full sm:w-48 shadow-md" style={{ width: "100%", border: "1px solid purple" }}>
                      <p className="text-lg font-bold" style={{ color: "green" }}>Open: {stockInfo.open}</p>
                      <p className="text-lg font-bold">Low: {stockInfo.low}</p>
                      <p className="text-lg font-bold" >High: {stockInfo.high}</p>
                      <p className="text-lg font-bold" style={{ color: "red" }}>Close: {stockInfo.close}</p>
                    </div>
                    <p style={{ fontWeight: "bold" }}>Note: These stock prices are from one minute ago.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center mt-3">
                      <input
                        className="border-2 my-2 border-lightpurple mr-2 bg-purple-100 p-2.5 rounded-md w-full sm:w-48"
                        placeholder="Enter Quantity"
                        type="Number"
                        onChange={(e) => setStockQuantity(e.target.value)}
                      />
                      <button
                        onClick={handleBuyStock}
                        className="btn btn-outline-success w-full sm:w-48 p-2.5"
                        style={{ height: "100%" }}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
            </div>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
        {!gettingDetails && <div className="col-md-6">
          {chartData.length === 0 && !gettingDetails && <Lottie animationData={animation} className="sm:max-w-1/2 m-1" style={{ height: "600px" }} />}
          {gettingDetails && <div ><Loader /></div>}
          {chartData.length > 0 && (
            <div style={{ marginTop: "130px" }}>
              <CandlestickChart data={chartData} options={chartOptions} loader={<div>Loading Chart</div>} />
            </div>
          )}
        </div>}
        {gettingDetails && <div className="col-md-6" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {gettingDetails && <div ><Loader /></div>}
        </div>}
      </section>
      <Footer />
    </>
  );

}

export default Buy;

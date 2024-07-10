import React, { useState } from "react";
import { getMonthlyData, getStock, getStockAnalysis } from "../../Api/trade";
import { Linechart } from "../../Utilis/Charts/LineChart";
import Loader from "../../Utilis/Loader/Loader";
import Navbar from "../../Utilis/Navbar/Navbar";
import Footer from "../../Utilis/Footer/Footer";

function Analysis() {
  const [stockName, setStockName] = useState("");
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await getStock(stockName);

      const [stockAnalysisResponse, monthlyDataResponse] = await Promise.all([
        getStockAnalysis(stockName),
        getMonthlyData(stockName)
      ]);

      const newChartData = {
        year: [],
        peRatio: [],
        marketCap: [],
        dividendYield: [],
        pbRatio: []
      };

      stockAnalysisResponse.response.forEach(details => {
        newChartData.year.push(details.calendarYear);
        newChartData.peRatio.push(details.peRatio);
        newChartData.marketCap.push(details.marketCap / 100000); // Convert to lakhs
        newChartData.dividendYield.push(details.dividendYield);
        newChartData.pbRatio.push(Number(details.pbRatio));
      });

      newChartData.year.reverse();
      newChartData.peRatio.reverse();
      newChartData.marketCap.reverse();
      newChartData.dividendYield.reverse();
      newChartData.pbRatio.reverse();

      const chartsData = [
        {
          title: "PE Ratio Over Years",
          data: [["Year", "PE Ratio"], ...newChartData.year.map((y, index) => [y, newChartData.peRatio[index]])],
          options: {
            title: "PE Ratio Over Years",
            backgroundColor: 'transparent',
            hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
            vAxis: { minValue: 0 },
            chartArea: { width: "50%", height: "70%" }
          }
        },
        {
          title: "Market Capital Over Years",
          data: [["Year", "Market Capital (Lakhs)"], ...newChartData.year.map((y, index) => [y, newChartData.marketCap[index]])],
          options: {
            title: "Market Capital Over Years",
            backgroundColor: 'transparent',
            hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
            vAxis: { minValue: 0, format: 'short' },
            chartArea: { width: "50%", height: "70%" }
          }
        },
        {
          title: "PB Ratio Over Years",
          data: [["Year", "PB Ratio"], ...newChartData.year.map((y, index) => [y, newChartData.pbRatio[index]])],
          options: {
            title: "PB Ratio Over Years",
            hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
            backgroundColor: 'transparent',
            vAxis: { minValue: 0 },
            chartArea: { width: "50%", height: "70%" }
          }
        },
        {
          title: "Dividend Yield Over Years",
          data: [["Year", "Dividend Yield"], ...newChartData.year.map((y, index) => [y, newChartData.dividendYield[index]])],
          options: {
            title: "Dividend Yield Over Years",
            hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
            vAxis: { minValue: 0 },
            backgroundColor: 'transparent',
            chartArea: { width: "50%", height: "70%" }
          }
        }
      ];

      const monthlyData = monthlyDataResponse.startingEntries.map(item => ({
        date: item.date,
        low: Number(item.low)
      })).reverse();

      const priceChartData = {
        title: "Price vs Date",
        data: [["Date", "Price of Stock"], ...monthlyData.map(item => [item.date, item.low])],
        options: {
          title: "Price vs Date",
          hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
          vAxis: { minValue: 0 },
          backgroundColor: 'transparent',
          chartArea: { width: "50%", height: "70%" }
        }
      };

      setCharts([...chartsData, priceChartData]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center flex-col items-center w-full" style={{minHeight:"80vh"}}>
        <h1 className="text-5xl mt-9 font-extrabold mb-4 text-[#111a6f]">Get Analysis Of Stocks</h1>
        <div className="my-4">
          <input
            className="border-2 border-lightpurple bg-purple-100 p-2.5 rounded-md mb-2 sm:mb-0 sm:mr-2 w-full sm:w-48"
            placeholder="Enter Stock Name"
            onChange={(e) => setStockName(e.target.value)}
          />
          <button className="p-2.5 bg-[#7743DB] text-white rounded-lg hover:bg-[#C3ACD0] hover:text-black mb-2 sm:mb-0 w-full sm:w-48" onClick={handleSubmit}>
            Get Details
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full grid grid-cols-1 ml-2 mr-2 md:grid-cols-2 gap-2">
            {charts.slice(0, -1).map((chart, index) => (
              <div key={index} className="border-2 border-gray-300 p-4 rounded-lg">
                <Linechart data={chart.data} options={chart.options} />
              </div>
            ))}
            {charts.length > 0 && (
              <div className="border-2 border-gray-300 p-4 rounded-lg col-span-1 md:col-span-2">
                <Linechart data={charts[charts.length - 1].data} options={charts[charts.length - 1].options} />
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Analysis;

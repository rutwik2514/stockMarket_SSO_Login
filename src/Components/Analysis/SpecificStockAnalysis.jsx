import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMonthlyData, getStockAnalysis } from "../../Api/trade";
import { Linechart } from "../../Utilis/Charts/LineChart";

import Loader from "../../Utilis/Loader/Loader";
import Navbar from "../../Utilis/Navbar/Navbar";
import Footer from "../../Utilis/Footer/Footer";

function SpecificStockAnalysis() {
    const { stockName } = useParams();
    const [charts, setCharts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
      const fetchStockAnalysis=async()=>{
        try {
            const stockAnalysisResponse = await getStockAnalysis(stockName);
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
                  vAxis: { 
                    minValue: 0,
                    format: 'short'
                  },
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
      
            setCharts(chartsData);
      
          } catch (e) {
            console.log(e);
          }
          try {
            const monthlyDataResponse = await getMonthlyData(stockName);
            const date = [];
            const low = [];
      
            monthlyDataResponse.startingEntries.forEach(item => {
              date.push(item.date);
              low.push(Number(item.low));
            });
      
            date.reverse();
            low.reverse();
      
            const priceChartData = {
              title: "Price vs Date",
              data: [["Date", "Price of Stock"], ...low.map((price, index) => [date[index], price])],
              options: {
                title: "Price vs Date",
                hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
                vAxis: { minValue: 0 },
                backgroundColor: 'transparent',
                chartArea: { width: "50%", height: "70%" }
              }
            };
      
            setCharts(prevCharts => [...prevCharts, priceChartData]);
      
          } catch (e) {
            console.log(e);
          } finally {
            setLoading(false); // End loading
          }
      }
      fetchStockAnalysis();
    },[stockName])

    return (
        <>
        <Navbar />
          <div className="flex justify-center flex-col items-center w-full">
            <h1 className="text-5xl mt-9 font-extrabold mb-4 text-[#52057B]">{stockName} Stock Analysis</h1>
            <div className="my-4">
            
           
            </div>
            {loading ? ( // Display the loader while loading
              <Loader />
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Footer/>
        </>
      );
}

export default SpecificStockAnalysis;
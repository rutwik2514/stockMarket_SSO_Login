import axios from "axios";
 /* eslint-disable */

let url = process.env.REACT_APP_API_URI


export const getUser = async () => {
  try {
    const token = localStorage.getItem("user");
    const user_info = await axios.post(
      `${url}/api/auth/fetchUser`,
      {},
      { headers: { authorization: token ? `${token}` : " " } }
    );
    return { user: user_info, error: null };
  } catch (error) {
    return { error: error.response.data.message };
  }
};

export const getStock = async (stockName) => {
  const stock_name = stockName;
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() - 1);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;
  const dateObj2 = new Date();
  dateObj2.setDate(dateObj2.getDate() - 2);
  const year2 = dateObj2.getFullYear();
  const month2 = (dateObj2.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day2 = dateObj2.getDate().toString().padStart(2, "0");

  const formattedDate2 = `${year2}-${month2}-${day2}`;

  let currentDate = `${formattedDate} 14:30:00`;
  console.log(currentDate)

  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-chart/1min/${stock_name}?from=${formattedDate2}&to=${formattedDate}&apikey=H1zferWKvAUxOfq8l950p97RLui7QkMG`
    );
    // console.log(response.data);
    const realTimeData = response.data.filter(
      (item) => item.date === currentDate
    );
    console.log("hiiii")
    console.log(realTimeData);
    return { stockInfo: realTimeData };
  } catch (e) {
    // console.log("Stock market is down at this moment");
    return { stockInfo: e };
  }
};
export const getMonthlyData=async(stockName)=>{
 
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-chart/1month/${stockName}?&apikey=H1zferWKvAUxOfq8l950p97RLui7QkMG`
    );
    const startingEntries = response.data.slice(0, 50);
    return{startingEntries:startingEntries}
  } catch (e) {
    return {startingEntries:"Stock market is down at this moment"};
  }

}

export const buyStock=async(stockName,stockInfo,stockQuantity)=>{
  const token = localStorage.getItem("user");
  const response= await axios.post(`${url}/api/stock/buy`,{
    stockName:stockName,
    stockBuyingPrice:stockInfo,
    stockBuyQuantity:stockQuantity
  },{ headers: { authorization: token ? `${token}` : " " } });
  console.log(response.data.message);
  return {message:response.data.message};
}
export const getStockData=async()=>{
  try{
   
    const token = localStorage.getItem("user");
    const response= await axios.post(`${url}/api/stock/getstocks`,{},{ headers: { authorization: token ? `${token}` : " " } });
    const portfolio_user=response.data;
    return{portfolio_user:portfolio_user}
  }catch(e)
  {
    console.log(e);
  }
 
}
export const handleSell=async(stockName,stockQuantity,stockPrice)=>{
  const token = localStorage.getItem("user");
  // console.log("inide handle sell",stockPrice);
  try{
    const response= await axios.post(`${url}/api/stock/sell`,{
      stockName:stockName,
      stockQuantity:stockQuantity,
      stockPrice:stockPrice
    },{
      headers: { authorization: token ? `${token}` : " " }
    })
    // console.log(response);
    return { error: null };
   
  }catch(e)
  {
    return { error:"There is error" };
  }
 

}
export const getStockAnalysis=async(stockName)=>{
    try{
      // console.log(stockName)
     const response= await axios.get(`https://financialmodelingprep.com/api/v3/key-metrics/${stockName}?period=annual&apikey=H1zferWKvAUxOfq8l950p97RLui7QkMG`)
    //  console.log("iside getstock analysis")
    //  console.log(response.data);
     return{response:response.data};
    }catch(e)
    {
      return{response:null};
    }
}
export const getUserDetails=async()=>{
  try{
    const token = localStorage.getItem("user");
    const response=await axios.post(`${url}/api/auth/getUserDetails`,{},{ headers: { authorization: token ? `${token}` : " " } });
    // console.log(response.data.user);
    return{response:response.data.user}
  }catch(e)
  {
    return {response:null};
  }
}
export const updateProfile=async(updateUserName)=>{
  try{
    const token = localStorage.getItem("user");
    const response=await axios.post(`${url}/api/auth/updateUser`,{updateUserName:updateUserName},{ headers: { authorization: token ? `${token}` : " " } });
    console.log(response);
    return{response:response.data.user}
  }catch(e)
  {
    return {response:null};
  }
}
import express from "express";
import Portfolio from "../models/portfolio_model.js";
import User from "../models/user_model.js";
import axios from "axios";

export const Buy = async (req, res) => {
  const { stockName, stockBuyingPrice, stockBuyQuantity } = req.body;
  const user = User.find(req.decoded_token);
  const userId = req.decoded_token.id;
  try {
    const portfolio_user = await Portfolio.findOne({ userId: userId });
    const dateObj = new Date();
    const currentDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')} ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}:00`;
    console.log(currentDate); // Outputs the current date in "YYYY-MM-DD HH:MM:00" format

    //check if stock name already exsists
    const stock = portfolio_user.portfolio.find(
      (stock) => stock.stockName === stockName
    );

    //checking if have enough balance
    if (portfolio_user.balance - stockBuyQuantity * stockBuyingPrice >= 0)
      portfolio_user.balance -= stockBuyQuantity * stockBuyingPrice;
    else {
      return res.status(500).json({ message: "You do not have enough balance" });
    }

    //if stock is buyed first time, push everything
    if (stock == null) {
      portfolio_user.portfolio.push({
        stockName: stockName,
        stockBuyingPrice: [
          {
            stockBuyQuantity: stockBuyQuantity,
            stockBuyPrice: stockBuyingPrice,
            stockBuyDate: currentDate,
          },
        ],
        stockSell: [],
        stockRemainigQuantity: stockBuyQuantity,
      });
      await portfolio_user.save();
    }
    //if stock was buyed already, then just update that field
    else {
      stock.stockBuyingPrice.push({
        stockBuyQuantity: stockBuyQuantity,
        stockBuyPrice: stockBuyingPrice,
        stockBuyDate: currentDate,
      });
      stock.stockRemainigQuantity += Number(stockBuyQuantity);
      await portfolio_user.save();
    }
    return res.status(200).json({ message: "Portfolio created successfully", portfolio: portfolio_user });
  } catch (error) {
    return res.status(404).json({ message: "Portfolio not found for the given userId" });
  }


};


export const Sell = async (req, res) => {

  const { stockName, stockQuantity, stockPrice } = req.body;
  const userId = req.decoded_token.id;
  // console.log("enetrere here");
  try {
    const portfolio = await Portfolio.findOne({ userId: userId });
    const stockRemainingQuantities = portfolio.portfolio.filter(stock => stock.stockName === stockName).map(filteredStock => filteredStock.stockRemainigQuantity);
    console.log(stockRemainingQuantities)
    if (stockQuantity > stockRemainingQuantities) {
      res.status(500).json({ message: "You do not have enough stocks to sell" });
      console.log("returning not enough stocks")
      return;
    }
    const stock = portfolio.portfolio.find(
      (stock) => stock.stockName == stockName
    );
    // console.log(stock);
    stock.stockRemainigQuantity = Number(stockRemainingQuantities) - Number(stockQuantity);
    // console.log(stock.stockRemainigQuantity)
    portfolio.balance = portfolio.balance + stockPrice * stockQuantity;
    // console.log(portfolio.balance)
    const dateObj = new Date();
    const currentDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')} ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}:00`;
    // console.log(currentDate);
    stock.stockSell.push({
      stockSellQuantity: stockQuantity,
      stockSellPrice: stockPrice,
      stockSellDate: currentDate
    });
    // console.log("i am pushed");
    try {
      await portfolio.save();
      res.status(200).json({ message: "Portfolio created Successfully" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error Updating Portfolio" })
    }

  } catch (e) {
    console.log("Stock market is down at this moment");
    // return { stockInfo: e };
  }
};

export const showStocks = async (req, res) => {
  const user = User.find(req.decoded_token);
  const userId = req.decoded_token.id;
  if (!userId) {
    return;
  }
  try {
    const portfolio_user = await Portfolio.findOne({ userId: userId });
    console.log("user is ", portfolio_user);
    res
      .status(200)
      .json({
        message: "data fetched succesfully",
        portfolio_user: portfolio_user,
      });
  } catch (e) {
    res.status(500).json({ message: "error occured" });
  }
};

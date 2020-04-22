import React, { Component } from 'react';
import axios from 'axios';
import PortfolioOrderForm from './PortfolioOrderForm';
import OrderCell from './OrderCell';
import TransactionSection from './TransactionSection';
import PortfolioCell from './PortfolioCell';
import PortfolioSection from './PortfolioSection';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export default class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [{}],
          balance:5000,
          orders:[],
          portfolioSection:[],
          portfolioTotal:0,
          TransactionSection:[],
          symbol:'',
          qty:'',
          stopOrderBlock:'' 
        }
        this.buyStock = this.buyStock.bind(this);
        this.takeSymbol = this.takeSymbol.bind(this);
        this.takeQty = this.takeQty.bind(this);
  }

  buyStock(event){
    event.preventDefault();
    let newOrder = {
        Symbol:this.state.symbol,
        Qty:this.state.qty
    };
    for(let info of this.state.data){
        if(newOrder.Symbol===info.symbol){
            newOrder.price=info.lastSalePrice;
            break;
        }
    }
    //console.log(newOrder.price);
    if(newOrder.price===undefined){
     this.setState({stopOrderBlock:<p>Please enter a valid Symbol</p>});
    } else if(newOrder.price*newOrder.Qty>this.state.balance){
        this.setState({stopOrderBlock:<p>You dont have enough funds for this purchase</p>});
    } else {
        let newOrders = this.state.orders;
        newOrders.push(newOrder);
        let orderHTML = newOrders.map(order => <OrderCell qty={order.Qty} symbol={order.Symbol} total={order.price*order.Qty} date={new Date().toUTCString()} />);
        // let orderHTML = this.state.TransactionSection;
        // for(let order of newOrders){
        //     orderHTML.push(<OrderCell qty={order.Qty} symbol={order.Symbol} total={order.price*order.Qty} date={new Date().toUTCString()} />);
        // }
        let newBalance = this.state.balance - (newOrder.price*newOrder.Qty);
        let ownedTotal = this.state.portfolioTotal + (newOrder.price*newOrder.Qty);
        let portfolioHTML = newOrders.map(order => <PortfolioCell qty={order.Qty} symbol={order.Symbol} total={order.price*order.Qty}/>);

        //update in state: orders, balance, portfolio
        this.setState({balance:newBalance.toFixed(2),orders:newOrders,portfolioTotal:ownedTotal.toFixed(2),portfolioSection: portfolioHTML,TransactionSection:orderHTML});
    }
  }

  takeSymbol(event){
    this.setState({symbol: event.target.value.toUpperCase()});
  }

  takeQty(event){
    this.setState({qty: parseInt(event.target.value)});
  }

    componentDidMount() {
        this.callApi();
    }
    async callApi() {
        try {
            const response = await axios.get('https://cloud.iexapis.com/stable/tops?token='+process.env.REACT_APP_KEY);
            console.log(response.data);
            this.setState({data:response.data});
        } catch (e) {
          console.log(e);
        }
      }
  
  render() {
    return (
      <div>
        <h1>Information</h1>
        <BrowserRouter>
        
        </BrowserRouter>
        <PortfolioOrderForm balance={this.state.balance} takeSymbol={this.takeSymbol} takeQty={this.takeQty} buyStock={this.buyStock} stopOrderBlock={this.state.stopOrderBlock}/>
        <TransactionSection TransactionSection={this.state.TransactionSection}/>
        <PortfolioSection portfolioTotal={this.state.portfolioTotal} portfolioSection={this.state.portfolioSection}/>
      </div>
      
    )
  }
}
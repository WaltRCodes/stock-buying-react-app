import React, { Component } from 'react';
import axios from 'axios';
import PortfolioOrderForm from './PortfolioOrderForm';
import OrderCell from './OrderCell';
import TransactionSection from './TransactionSection';
import PortfolioCell from './PortfolioCell';
import PortfolioSection from './PortfolioSection';
import Navbar from './Navbar';
import {
    BrowserRouter,
    Route
  } from "react-router-dom";
export default class Information extends Component {
    constructor(props) {
        super(props);
        {/* established the states needed to place and hold the stock orders and the user portfolio */}
        this.state = {
          data: [{}],
          balance:5000,
          orders:[],
          portfolio:[],
          portfolioSection:[],
          portfolioTotal:0,
          TransactionSection:[],
          symbol:'',
          qty:'',
          stopOrderBlock:'' 
        }
        {/* made methods to take info from the stock forms and use it to buy stock if the user can */}
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
    {/* check to see if the user symbol was correct and if so to take the cost of each share */}
    for(let info of this.state.data){
        if(newOrder.Symbol===info.symbol){
            newOrder.price=parseInt(info.lastSalePrice);
            break;
        }
    }
    //console.log(newOrder.price);
    {/* had a message pop up if the symbol is wrong or the user does not have enough money */}
    if(newOrder.price===undefined){
        this.setState({stopOrderBlock:<p>Please enter a valid Symbol</p>});
    } else if(newOrder.price*newOrder.Qty>this.state.balance){
        this.setState({stopOrderBlock:<p>You dont have enough funds for this purchase</p>});
    } else {
        {/* create an array of componenets holding the order info */}
        let newOrders = this.state.orders;
        newOrders.push(newOrder);
        let orderHTML = newOrders.map(order => <OrderCell qty={order.Qty} symbol={order.Symbol} total={order.price*order.Qty} date={new Date().toUTCString()} />);
        // let orderHTML = this.state.TransactionSection;
        // for(let order of newOrders){
        //     orderHTML.push(<OrderCell qty={order.Qty} symbol={order.Symbol} total={order.price*order.Qty} date={new Date().toUTCString()} />);
        // }
        {/* calculate the new balance and the new Portfolio amount */}
        let newBalance = this.state.balance - (newOrder.price*newOrder.Qty);
        let ownedTotal = this.state.portfolioTotal + (newOrder.price*newOrder.Qty);
        {/* create an array of portfolio elements that do no repeat the same share twice */}
        let newPortfolio = this.state.portfolio;
        let found = newPortfolio.findIndex(stock => stock.Symbol===newOrder.Symbol);
        //console.log(found);
        if(found!==-1){
            newPortfolio[found].Qty=newPortfolio[found].Qty+newOrder.Qty;
        } else {
            newPortfolio.push(newOrder);
        }
        let portfolioHTML = newPortfolio.map(order => <PortfolioCell qty={order.Qty} symbol={order.Symbol} total={order.price*order.Qty}/>);

        //update all the data we have into state
        this.setState({balance:newBalance.toFixed(2),orders:newOrders,portfolioTotal:ownedTotal,portfolioSection: portfolioHTML,TransactionSection:orderHTML});
    }
  }

  takeSymbol(event){
    {/* update the ymbol in state */}
    this.setState({symbol: event.target.value.toUpperCase()});
  }

  takeQty(event){
    {/* update the quantity in state */}
    this.setState({qty: parseInt(event.target.value)});
  }

    componentDidMount() {
        {/* call the api on page load */}
        this.callApi();
    }
    async callApi() {
        try {
            const response = await axios.get('https://cloud.iexapis.com/stable/tops?token='+process.env.REACT_APP_KEY);
            //console.log(response.data);
            {/* store api data in state */}
            this.setState({data:response.data});
        } catch (e) {
          console.log(e);
        }
      }
  
  render() {
    return (
      <div>
        {/* https://reacttraining.com/react-router/web/api/Route/route-props */}
        <BrowserRouter>
            <Navbar />
            <Route path="/Portfolio" render={() => <div className="parent">
                <h1 className="title">Portfolio</h1>
                <PortfolioOrderForm balance={this.state.balance} takeSymbol={this.takeSymbol} takeQty={this.takeQty} buyStock={this.buyStock} stopOrderBlock={this.state.stopOrderBlock}/>
                <PortfolioSection portfolioTotal={this.state.portfolioTotal} portfolioSection={this.state.portfolioSection}/>
            </div>} />
            <Route path="/Transactions" render={() => <div><TransactionSection TransactionSection={this.state.TransactionSection}/></div>} />
        </BrowserRouter>
        
      </div>
      
    )
  }
}
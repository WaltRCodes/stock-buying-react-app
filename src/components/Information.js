import React, { Component } from 'react';
import axios from 'axios';
import PortfolioOrderForm from './PortfolioOrderForm';
export default class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [{}],
          balance:5000,
          orders:[],
          portfolioSection:'',
          symbol:'',
          qty:'',
          currentOrder:{
              Symbol:'',
              Qty:'',
              price:0
          },
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
        let orders = this.state.orders;
        orders.push(newOrder);

        //update in state: orders, balance, portfolio
        
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
        <PortfolioOrderForm balance={this.state.balance} takeSymbol={this.takeSymbol} takeQty={this.takeQty} buyStock={this.buyStock} stopOrderBlock={this.state.stopOrderBlock}/>
      </div>
      
    )
  }
}
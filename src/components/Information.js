import React, { Component } from 'react';
import axios from 'axios';
import PortfolioOrderForm from './PortfolioOrderForm';
export default class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [''],
          balance:5000,
          orders:[''],
          portfolio:'',
          symbol:'',
          qty:'',
          currentOrder:{
              Symbol:'',
              Qty:''
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
  }

  takeSymbol(event){
    this.setState({symbol: event.target.value});
  }

  takeQty(event){
    this.setState({qty: event.target.value});
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
        <PortfolioOrderForm takeSymbol={this.takeSymbol} takeQty={this.takeQty} buyStock={this.buyStock} stopOrderBlock={this.state.stopOrderBlock}/>
      </div>
      
    )
  }
}
import React, { Component } from 'react';
import axios from 'axios';
export default class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [''],
          balance:5000,
          orders:[''],
          portfolio:'' 
        }
        this.buyStock = this.buyStock.bind(this);
        this.takeSymbol = this.takeSymbol.bind(this);
        this.takeQty = this.takeQty.bind(this);
  }

  buyStock(event){
    event.preventDefault();
  }

  takeSymbol(event){
  }

  takeQty(event){
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
      </div>
      
    )
  }
}
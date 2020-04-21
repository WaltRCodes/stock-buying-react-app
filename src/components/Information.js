import React, { Component } from 'react';
import axios from 'axios';
import {IEXCLOUD_PUBLIC_KEY} from './key';
export default class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [''],
          balance:5000 
        }
        
      }

    componentDidMount() {
        this.callApi();
    }
    async callApi() {
        try {
            const response = await axios.get('https://cloud.iexapis.com/stable/tops?token='+IEXCLOUD_PUBLIC_KEY);
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
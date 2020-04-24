import React from 'react';
const PortfolioOrderForm =(props)=> {
  return (
    <div className="aside order-holder">
        <h3>{props.balance}</h3>
        <form onSubmit={props.buyStock}>
        <label>
              Symbol
              <input type="text" onChange={props.takeSymbol} placeholder="Symbol"/>
              <br />
          </label>
          <label>
              Qty
              <input type="number" onChange={props.takeQty} placeholder="Qty"/>
              <br />
          </label>
          <label>
              <input type="submit" value="Submit"/>
          </label>
        </form>
        <div>{props.stopOrderBlock}</div>
    </div>
  );
}

export default PortfolioOrderForm;
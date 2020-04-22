import React from 'react';
function PortfolioOrderForm(props) {
  return (
    <div>
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
        </form>
    </div>
  );
}

export default PortfolioOrderForm;
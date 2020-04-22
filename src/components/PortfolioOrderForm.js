import React from 'react';
function PortfolioOrderForm(props) {
  return (
    <div>
        <form>
        <label>
              Symbol
              <input type="text" onChange={props.takeSymbol} placeholder="Symbol"/>
              <br />
          </label>
          <label>
              Qty
              <input type="text" onChange={props.takeQty} placeholder="Qty"/>
              <br />
          </label>
        </form>
    </div>
  );
}

export default PortfolioOrderForm;
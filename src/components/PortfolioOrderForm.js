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
        </form>
    </div>
  );
}

export default PortfolioOrderForm;
import React from 'react';
function PortfolioCell(props) {
  return (
    <div>
        <p>{props.qty} shares of {props.symbol} worth {props.total}</p>
    </div>
  );
}

export default PortfolioCell;
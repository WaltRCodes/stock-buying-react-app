import React from 'react';
const OrderCell = (props) => {
  return (
    <div className="cell-holder">
        <p>Bought {props.qty} shares of {props.symbol} for ${props.total} on {props.date}</p>
    </div>
  );
}

export default OrderCell;
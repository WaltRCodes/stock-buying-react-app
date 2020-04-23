import React from 'react';
const OrderCell = (props) => {
  return (
    <div>
        <p>Bought {props.qty} shares of {props.symbol} for ${props.total} on {props.date}</p>
    </div>
  );
}

export default OrderCell;
import React from 'react';
const PortfolioCell = (props) => {
    {/* display the portfolio info based on what stocks the user has */}
  return (
    <div>
        <p style={{color:props.style}}>{props.qty} shares of {props.symbol} worth ${props.total}</p>
    </div>
  );
}

export default PortfolioCell;
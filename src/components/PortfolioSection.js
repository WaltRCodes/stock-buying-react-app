import React from 'react';
const PortfolioSection = (props) => {
  return (
    <div className="article order-holder">
        <h3>${props.portfolioTotal}</h3>
        <div>{props.portfolioSection}</div>
    </div>
  );
}

export default PortfolioSection;
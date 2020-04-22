import React from 'react';
function PortfolioSection(props) {
  return (
    <div>
        <h3>{props.portfolioTotal}</h3>
        <div>{props.portfolioSection}</div>
    </div>
  );
}

export default PortfolioSection;
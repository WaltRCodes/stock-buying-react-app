import React from 'react';
const TransactionSection=(props)=> {
  return (
    <div className="transaction-section">
        <h1>Transactions</h1>
        {props.TransactionSection}
    </div>
  );
}

export default TransactionSection;
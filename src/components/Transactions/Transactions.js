import React, { Component } from 'react';
import TransactionItem from '../TransactionItem/TransactionItem';
import './Transactions.css';

class Transactions extends Component {
	render() {
		const txList = this.props.transactions.map((tx) => {
			return (
				<div key={tx.txid} className='transactionSection'>
					<TransactionItem
						transaction={tx}
						setStateElement={this.props.setStateElement}
						setAddress={this.props.setAddress}
						hostingURL={this.props.hostingURL}
					/>
				</div>
			);
		});
		return <>{txList}</>;
	}
}

export default Transactions;

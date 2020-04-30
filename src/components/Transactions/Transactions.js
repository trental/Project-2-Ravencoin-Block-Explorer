import React, { Component } from 'react';
import TransactionItem from '../TransactionItem/TransactionItem';

class Transactions extends Component {
	render() {
		const txList = this.props.transactions.map((tx) => {
			return (
				<TransactionItem
					key={tx.txid}
					transaction={tx}
					setStateElement={this.props.setStateElement}
				/>
			);
		});
		return <>{txList}</>;
	}
}

export default Transactions;

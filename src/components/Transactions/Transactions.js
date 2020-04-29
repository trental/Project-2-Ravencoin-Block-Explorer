import React, { Component } from 'react';
import TransactionItem from '../TransactionItem/TransactionItem';

class Transactions extends Component {
	render() {
		const txList = this.props.transactions.map((tx) => (
			<div>
				<TransactionItem transaction={tx} />
			</div>
		));
		return <>{txList}</>;
	}
}

export default Transactions;

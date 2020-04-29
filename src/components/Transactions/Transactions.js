import React, { Component } from 'react';
import TransactionItem from '../TransactionItem/TransactionItem';

class Transactions extends Component {
	render() {
		const txList = this.props.transactions.map((tx) => (
			<div>
				<TransactionItem
					transaction={tx}
					setAddress={this.props.setAddress}
					setBlock={this.props.setBlock}
					setStateElement={this.props.setStateElement}
				/>
			</div>
		));
		return <>{txList}</>;
	}
}

export default Transactions;

import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';

class Transaction extends Component {
	componentDidMount() {
		// this.props.setStateElement('transaction', this.props.match.params.txHash);
		this.props.setTransaction(this.props.match.params.txHash);
	}

	render() {
		return (
			<>
				<Transactions
					transactions={this.props.transactions}
					setStateElement={this.props.setStateElement}
					setAddress={this.props.setAddress}
				/>
			</>
		);
	}
}

export default Transaction;

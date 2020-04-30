import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';
import { Link } from 'react-router-dom';

class Transaction extends Component {
	componentDidMount() {
		this.props.setStateElement('transaction', this.props.match.params.txHash);
	}

	render() {
		return (
			<>
				<Transactions
					transactions={this.props.transactions}
					setStateElement={this.props.setStateElement}
				/>
			</>
		);
	}
}

export default Transaction;

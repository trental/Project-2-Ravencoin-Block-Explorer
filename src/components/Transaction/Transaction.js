import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';
import { Link } from 'react-router-dom';
import './Transaction.css';

class Transaction extends Component {
	componentDidMount() {
		// this.props.setStateElement('transaction', this.props.match.params.txHash);
		this.props.setTransaction(this.props.match.params.txHash);
	}

	Unix_timestamp(t) {
		var dt = new Date(t * 1000);
		return dt + '';
	}

	render() {
		return (
			<>
				<div className='mainTransactionSection'>
					<p>
						Received Time: {this.Unix_timestamp(this.props.transaction.time)}
					</p>
					<p>
						Mined Time:{' '}
						{this.props.transaction.blocktime
							? this.Unix_timestamp(this.props.transaction.blocktime)
							: ''}
					</p>
					<p>
						Included in Block:{' '}
						{this.props.transaction.blockhash ? (
							<Link
								to={
									this.props.hostingURL +
									'/block/' +
									this.props.transaction.blockhash
								}>
								{this.props.transaction.blockhash}
							</Link>
						) : (
							''
						)}
					</p>
				</div>
				<Transactions
					transactions={this.props.transactions}
					setStateElement={this.props.setStateElement}
					setAddress={this.props.setAddress}
					hostingURL={this.props.hostingURL}
				/>
			</>
		);
	}
}

export default Transaction;

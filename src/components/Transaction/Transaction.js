import React, { Component } from 'react';

class Transaction extends Component {
	componentDidMount() {
		this.props.setTransaction(this.props.match.params.txHash);
	}

	render() {
		return (
			<div>
				{this.props.transaction.txid} {this.props.transaction.valueOut}
			</div>
		);
	}
}

// const Transaction = (props) => {
// 	return <div>{props.transaction.txid}</div>;
// };

export default Transaction;

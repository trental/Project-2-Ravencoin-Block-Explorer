import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';

class Block extends Component {
	componentDidMount() {
		this.props.setBlock(this.props.match.params.blockHash);
	}

	render() {
		return (
			<>
				<div>
					{this.props.block.hash} {this.props.block.tx.length}
				</div>
				<Transactions transactions={this.props.transactions} />
			</>
		);
	}
}

// const Transaction = (props) => {
// 	return <div>{props.transaction.txid}</div>;
// };

export default Block;

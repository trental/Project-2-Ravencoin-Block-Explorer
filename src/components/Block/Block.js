import React, { Component } from 'react';

class Block extends Component {
	componentDidMount() {
		// console.log(this.props.match.params);
		this.props.setBlock(this.props.match.params.blockHash);
	}

	render() {
		return (
			<div>
				{this.props.block.hash} {this.props.block.tx.length}
			</div>
		);
	}
}

// const Transaction = (props) => {
// 	return <div>{props.transaction.txid}</div>;
// };

export default Block;

import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';

class Block extends Component {
	componentDidMount() {
		this.props.setStateElement('block', this.props.match.params.blockHash);
	}

	render() {
		return (
			<>
				<div>
					{this.props.block.hash} {this.props.block.tx.length}
				</div>
				<Transactions
					transactions={this.props.transactions}
					setStateElement={this.props.setStateElement}
				/>
			</>
		);
	}
}

export default Block;

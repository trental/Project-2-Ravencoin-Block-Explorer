import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';
import Button from 'react-bootstrap/Button';

class Block extends Component {
	constructor(props) {
		super(props);

		this.controller = new AbortController();
		this.signal = this.controller.signal;
	}

	async componentDidMount() {
		await this.props.clearBlock();
		const signal = this.signal;
		this.props.setBlock(this.props.match.params.blockHash, { signal });
	}

	componentWillUnmount() {
		this.controller.abort();
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
					setAddress={this.props.setAddress}
				/>
				<Button
					variant='primary'
					onClick={() => this.props.setMoreBlockTransactions()}>
					Load More Transactions
				</Button>
			</>
		);
	}
}

export default Block;

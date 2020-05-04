import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';
import Button from 'react-bootstrap/Button';
import './Block.css';
import { Link } from 'react-router-dom';

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
				<div className='blockSection'>
					<h3>Block Height:{this.props.block.height}</h3>
					<p>Block Hash:{this.props.block.hash}</p>
					<div className='blockNav'>
						<div className='previousBlock'>
							<Link
								to={'/block/' + this.props.block.previousblockhash}
								onClick={() =>
									this.props.setBlock(this.props.block.previousblockhash)
								}>
								Previous Block
							</Link>
						</div>
						<div className='nextBlock'>
							{' '}
							<Link
								to={'/block/' + this.props.block.nextblockhash}
								onClick={() =>
									this.props.setBlock(this.props.block.nextblockhash)
								}>
								{this.props.block.nextblockhash ? 'Next Block' : ''}
							</Link>
						</div>
					</div>
				</div>
				<Transactions
					transactions={this.props.transactions}
					setStateElement={this.props.setStateElement}
					setAddress={this.props.setAddress}
				/>
				<Button
					variant='primary'
					onClick={() => this.props.setMoreBlockTransactions()}
					className={
						this.props.transactions.length < this.props.block.tx.length
							? ''
							: 'hidden'
					}>
					Load More Transactions
				</Button>
			</>
		);
	}
}

export default Block;

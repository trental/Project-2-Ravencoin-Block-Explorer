import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TransactionItem.css';

class TransactionItem extends Component {
	render() {
		const vinList = this.props.transaction.vin.map((addrIn) => {
			if (addrIn.coinbase) {
				return <div key={addrIn.n}>No Inputs, New Coins</div>;
			} else {
				return (
					<div key={addrIn.n}>
						<Link
							to={'/addr/' + addrIn.addr}
							onClick={() => this.props.setAddress(addrIn.addr)}>
							{addrIn.addr}
						</Link>{' '}
						<span>{addrIn.value}</span>
					</div>
				);
			}
		});
		const voutList = this.props.transaction.vout.map((addrOut) => {
			if (addrOut.scriptPubKey.addresses) {
				return (
					<div key={addrOut.n}>
						<Link
							to={'/addr/' + addrOut.scriptPubKey.addresses[0]}
							onClick={() =>
								this.props.setAddress(addrOut.scriptPubKey.addresses[0])
							}>
							{addrOut.scriptPubKey.addresses[0]}
						</Link>{' '}
						{addrOut.value}
					</div>
				);
			} else {
				return <div key={addrOut.n}>OP RETURN</div>;
			}
		});
		return (
			<>
				<div>
					<p>
						Transaction:{' '}
						<Link to={'/tx/' + this.props.transaction.txid}>
							{this.props.transaction.txid}
						</Link>
					</p>
				</div>
				<div className='addressSection'>Inputs: {vinList}</div>
				<div className='addressSection'>Outputs: {voutList}</div>
				<div>
					<p>Fee: {this.props.transaction.fees}</p>
				</div>
			</>
		);
	}
}

export default TransactionItem;

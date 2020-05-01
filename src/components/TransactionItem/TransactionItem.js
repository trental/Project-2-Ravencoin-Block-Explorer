import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TransactionItem extends Component {
	render() {
		const vinList = this.props.transaction.vin.map((addrIn) => {
			if (addrIn.coinbase) {
				return <p key={addrIn.n}>No Inputs, New Coins</p>;
			} else {
				return (
					<p key={addrIn.n}>
						<Link
							to={'/addr/' + addrIn.addr}
							onClick={() => this.props.setAddress(addrIn.addr)}>
							{addrIn.addr}
						</Link>{' '}
						{addrIn.value}
					</p>
				);
			}
		});
		const voutList = this.props.transaction.vout.map((addrOut) => {
			if (addrOut.scriptPubKey.addresses) {
				return (
					<p key={addrOut.n}>
						<Link
							to={'/addr/' + addrOut.scriptPubKey.addresses[0]}
							onClick={() =>
								this.props.setAddress(addrOut.scriptPubKey.addresses[0])
							}>
							{addrOut.scriptPubKey.addresses[0]}
						</Link>{' '}
						{addrOut.value}
					</p>
				);
			} else {
				return <p key={addrOut.n}>OP RETURN</p>;
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
				<div>Inputs: {vinList}</div>
				<div>Outputs: {voutList}</div>
				<div>
					<p>Fee: {this.props.transaction.fees}</p>
				</div>
			</>
		);
	}
}

export default TransactionItem;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Transaction extends Component {
	componentDidMount() {
		this.props.setTransaction(this.props.match.params.txHash);
	}

	render() {
		const vinList = this.props.transaction.vin.map((addrIn) => {
			if (addrIn.coinbase) {
				return <p>No Inputs, New Coins</p>;
			} else {
				return (
					<p>
						<Link to={'/addr/' + addrIn.addr}>{addrIn.addr}</Link>{' '}
						{addrIn.value}
					</p>
				);
			}
		});
		const voutList = this.props.transaction.vout.map((addrOut) => {
			if (addrOut.scriptPubKey.addresses) {
				return (
					<p>
						<Link to={'/addr/' + addrOut.scriptPubKey.addresses[0]}>
							{addrOut.scriptPubKey.addresses[0]}
						</Link>{' '}
						{addrOut.value}
					</p>
				);
			} else {
				return <p>OP RETURN</p>;
			}
		});
		return (
			<>
				<div>
					<p>Transaction: {this.props.transaction.txid}</p>
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

export default Transaction;

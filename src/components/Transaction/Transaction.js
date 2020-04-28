import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Transaction extends Component {
	componentDidMount() {
		this.props.setTransaction(this.props.match.params.txHash);
	}

	render() {
		const vinList = this.props.transaction.vin.map((addrIn) => (
			<p>
				<Link to={'/addr/' + addrIn.addr}>{addrIn.addr}</Link> {addrIn.value}
			</p>
		));
		const voutList = this.props.transaction.vout.map((addrOut) => (
			<p>
				<Link to={'/addr/' + addrOut.scriptPubKey.addresses[0]}>
					{addrOut.scriptPubKey.addresses[0]}
				</Link>{' '}
				{addrOut.value}
			</p>
		));
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

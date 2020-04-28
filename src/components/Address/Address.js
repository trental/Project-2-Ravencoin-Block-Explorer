import React, { Component } from 'react';
import Transaction from '../Transaction/Transaction';

class Address extends Component {
	componentDidMount() {
		this.props.setAddress(this.props.match.params.address);
	}

	render() {
		const txList = this.props.address.transactions.map((tx) => <p>{tx}</p>);
		return (
			<div>
				{this.props.address.addrStr} {this.props.address.balance}
				{txList}
			</div>
		);
	}
}

export default Address;

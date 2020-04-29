import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';

class Address extends Component {
	componentDidMount() {
		this.props.setAddress(this.props.match.params.address);
	}

	render() {
		return (
			<div>
				{this.props.address.addrStr} {this.props.address.balance}
				<Transactions
					transactions={this.props.transactions}
					setAddress={this.props.setAddress}
					setBlock={this.props.setAddress}
				/>
			</div>
		);
	}
}

export default Address;

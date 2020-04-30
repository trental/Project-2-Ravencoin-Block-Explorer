import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';

class Address extends Component {
	componentDidMount() {
		this.props.setStateElement('address', this.props.match.params.address);
	}

	render() {
		return (
			<div>
				{this.props.address.addrStr} {this.props.address.balance}
				<Transactions
					transactions={this.props.transactions}
					setStateElement={this.props.setStateElement}
				/>
			</div>
		);
	}
}

export default Address;

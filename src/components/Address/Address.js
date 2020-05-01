import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';

class Address extends Component {
	constructor(props) {
		super(props);

		this.controller = new AbortController();
		this.signal = this.controller.signal;
	}

	async componentDidMount() {
		await this.props.clearAddress();
		const signal = this.signal;
		this.props.setAddress(this.props.match.params.address, { signal });
	}

	componentWillUnmount() {
		this.controller.abort();
	}

	render() {
		return (
			<div>
				{this.props.address.addrStr} {this.props.address.balance}
				<Transactions
					transactions={this.props.transactions}
					setStateElement={this.props.setStateElement}
					setAddress={this.props.setAddress}
				/>
			</div>
		);
	}
}

export default Address;

import React, { Component } from 'react';
import Transactions from '../Transactions/Transactions';
import './Address.css';

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
			<>
				<div className='mainAddressSection'>
					<h3>{this.props.address.addrStr}</h3>
					<p>Final Balance:{this.props.address.totalReceived} RVN</p>
					<p>Final Balance:{this.props.address.totalSent} RVN</p>
					<p>Final Balance:{this.props.address.balance} RVN</p>
					<p>Transactions:{this.props.address.txApperances}</p>
				</div>
				<div>
					<Transactions
						transactions={this.props.transactions}
						setStateElement={this.props.setStateElement}
						setAddress={this.props.setAddress}
						hostingURL={this.props.hostingURL}
					/>
				</div>
				<button
					onClick={() => this.props.setMoreAddressTransactions()}
					className={
						this.props.transactions.length <
						this.props.address.transactions.length
							? ''
							: 'hidden'
					}>
					{' '}
					Load More Transactions
				</button>
			</>
		);
	}
}

export default Address;

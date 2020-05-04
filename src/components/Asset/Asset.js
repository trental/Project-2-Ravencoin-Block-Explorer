import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Asset extends Component {
	componentDidMount() {
		this.props.setStateElement('asset', this.props.match.params.asset);
	}

	render() {
		const asset = Object.keys(this.props.asset)[0];
		return (
			<>
				<p>name: {asset}</p>
				<p>amount: {this.props.asset[asset].amount}</p>
				<p>units: {this.props.asset[asset].units}</p>
				<p>reissuable: {this.props.asset[asset].reissuable}</p>
				<p>has_ipfs: {this.props.asset[asset].has_ipfs}</p>
				<p>block_height: {this.props.asset[asset].block_height}</p>
				<p>
					blockhash:{' '}
					<Link
						to={
							this.props.hostingURL +
							'/block/' +
							this.props.asset[asset].blockhash
						}>
						{this.props.asset[asset].blockhash}
					</Link>
				</p>
			</>
		);
	}
}

export default Asset;

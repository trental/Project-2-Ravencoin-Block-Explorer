import React, { Component } from 'react';
import Block from '../Block/Block';
import { Link } from 'react-router-dom';

class Asset extends Component {
	componentDidMount() {
		this.props.setAsset(this.props.match.params.assetName);
	}

	render() {
		const assetName = Object.keys(this.props.asset)[0];
		return (
			<>
				<p>name: {assetName}</p>
				<p>amount: {this.props.asset[assetName].amount}</p>
				<p>units: {this.props.asset[assetName].units}</p>
				<p>reissuable: {this.props.asset[assetName].reissuable}</p>
				<p>has_ipfs: {this.props.asset[assetName].has_ipfs}</p>
				<p>block_height: {this.props.asset[assetName].block_height}</p>
				<p>
					blockhash:{' '}
					<Link to={'/block/' + this.props.asset[assetName].blockhash}>
						{this.props.asset[assetName].blockhash}
					</Link>
				</p>
			</>
		);
	}
}

export default Asset;

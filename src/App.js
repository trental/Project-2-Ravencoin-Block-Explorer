import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Transaction from './components/Transaction/Transaction';
import Block from './components/Block/Block';
import Header from './components/Header/Header';
import Address from './components/Address/Address';
import Asset from './components/Asset/Asset';

const numTransactions = 10;
const numBlocks = 10;
const numRandomAssets = 10;
const apiUrl = 'https://ravenexplorer.net';
const totalAssets = 23463;
const randomAssetURL = '/api/assets?asset=*&size=1&skip=';
const assetURL = '/api/assets?verbose=true&asset=';
const addressURL = '/api/addr/';
const blockIndexURL = '/api/block-index/';
const blockHashURL = '/api/block/';
const txURL = '/api/tx/';
const statusURL = '/api/status?q=getInfo';
const stateKeyURL = {
	address: addressURL,
	asset: assetURL,
	block: blockHashURL,
	transaction: txURL,
};

// const apiUrl = 'http://192.168.1.21:3100';
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			transaction: { vin: [], vout: [] }, // include arrays for render before data load
			runningTransactions: [],
			block: { tx: [] }, // include arrays for render before data load
			runningBlocks: [],
			address: { transactions: [] }, // include arrays for render before data load
			transactions: [{ vin: [], vout: [] }], // include arrays for render before data load
			asset: { temp: {} }, // include object for render before data load
			randomAssets: [],
			search: '',
			searchMatch: [],
		};
	}

	addRunningTransaction(newTransaction) {
		const newTransactionsList = [
			newTransaction,
			...this.state.runningTransactions,
		];

		// remove transactions if more than 10 in the list
		while (newTransactionsList.length > numTransactions) {
			newTransactionsList.pop();
		}

		this.setState({ runningTransactions: newTransactionsList });
	}

	addRunningBlock(newBlockData) {
		const newBlocksList = [newBlockData, ...this.state.runningBlocks];

		// remove blocks if more than wanted in the list
		while (newBlocksList.length > numBlocks) {
			newBlocksList.pop();
		}

		this.setState({
			runningBlocks: newBlocksList,
		});
	}

	setStateElement(stateKey, item) {
		let app = this;
		let url = stateKeyURL[stateKey];

		this.getAPIElement(url, item)
			.then((data) => {
				this.setState({ [stateKey]: data }, () => {
					if (['block', 'address'].includes(stateKey)) {
						app.addTransactionSet(this.state.block.tx);
					}
				});
			})
			.catch((error) => console.error(error));
	}

	addTransactionSet(transactionList) {
		const workingList = [...transactionList];
		const originalThis = this;

		const recursivePullTransaction = (txArray) => {
			if (txArray.length > 0) {
				let singleTx = txArray.pop();
				recursivePullTransaction(txArray);
				originalThis
					.getAPIElement(txURL, singleTx)
					.then((tx) => originalThis.addTransaction(tx));
			}
		};

		this.setState({ transactions: [] }, recursivePullTransaction(workingList));
	}

	addTransaction(newTransaction) {
		const newTransactionsList = [newTransaction, ...this.state.transactions];
		this.setState({ transactions: newTransactionsList });
	}

	addStateElement(stateKey, item, position = 'back') {
		const currArray = [...this.state[stateKey]];
		if (position === 'front') {
			currArray.unshift(item);
		} else {
			currArray.push(item);
		}
		this.setState({ [stateKey]: currArray });
	}

	getAPIElement(endPoint, item) {
		return new Promise((resolve, reject) => {
			fetch(apiUrl + endPoint + item)
				.then((response) => response.json())
				.then((data) => {
					resolve(data);
				})
				.catch((error) => reject(error));
		});
	}

	//////////////////////
	//
	// Startup
	//
	//////////////////////

	addRandomAssets() {
		let randomAsset = 1000;
		let app = this;
		for (let i = 0; i < numRandomAssets; i++) {
			randomAsset = Math.floor(Math.random() * totalAssets) + 1;
			this.getAPIElement(randomAssetURL, randomAsset).then((data) =>
				app.addStateElement('randomAssets', data[0])
			);
		}
	}

	addRecentBlocks() {
		let latestBlock = 1000;
		let app = this;

		const callBlocks = () => {
			for (let i = 0; i < numBlocks; i++) {
				app.getAPIElement(blockIndexURL, latestBlock - i).then((data) => {
					app
						.getAPIElement(blockHashURL, data.blockHash)
						.then((data) => app.addStateElement('runningBlocks', data));
				});
			}
		};

		this.getAPIElement(statusURL, '').then((data) => {
			latestBlock = data.info.blocks;
			callBlocks();
		});
	}

	io() {
		// this lazy function does nothing
		// but satisfies React when React wants to find a this.io function before
		// loading the websocket stuff
	}

	componentDidMount() {
		// get five last blocks and populate state
		this.addRecentBlocks();
		this.addRandomAssets();

		// create web socket
		const script = document.createElement('script');
		script.src = 'https://ravenexplorer.net/socket.io/socket.io.js';
		script.async = true;
		document.body.appendChild(script);

		let originalThis = this;

		setTimeout(function () {
			const room = 'inv';

			// react really doesn't like this unless there is a lazy this.io function above
			const socket = this.io(apiUrl + '/');

			socket.on('connect', function () {
				// Join the room.
				socket.emit('subscribe', room);
			});
			socket.on('tx', function (txData) {
				originalThis
					.getAPIElement(txURL, txData.txid)
					.then((txData) => originalThis.addRunningTransaction(txData))
					.catch((error) => console.log(error));
			});
			socket.on('block', function (blockHash) {
				originalThis
					.getAPIElement(blockHashURL, blockHash)
					.then((blockData) => originalThis.addRunningBlock(blockData))
					.catch((error) => console.log(error));
			});
		}, 500); // delay here so that the socket js file can be loaded from remote
	}

	//////////////////////
	//
	// Search functions
	//
	//////////////////////

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value }, () => {
			this.clearThenSpeculativeSearch();
		});
	}

	clearThenSpeculativeSearch() {
		this.setState({ searchMatch: [] }, () => {
			this.speculativeSearch();
		});
	}

	clearSearch() {
		this.setState({ search: [] }, () => {
			this.setState({ searchMatch: [] });
		});
	}

	speculativeSearch() {
		// search for Block, Transaction, Address, or Asset and build an array of all possible matches
		if (this.state.search !== '') {
			this.getAPIElement(blockHashURL, this.state.search)
				.then((data) => {
					if (JSON.stringify(data) !== '["Not found"]') {
						let newBlockByHash = {
							hash: data.hash,
							blockHeight: data.height,
							transactions: data.tx.length,
						};
						this.addSearchMatch('block', newBlockByHash);
					}
				})
				.catch((error) => console.log(error));
			this.getAPIElement(txURL, this.state.search)
				.then((data) => {
					if (JSON.stringify(data) !== '["Not found"]') {
						let newTx = {
							hash: data.txid,
							blockHeight: data.blockHeight,
							valueOut: data.valueOut,
						};
						this.addSearchMatch('transaction', newTx);
					}
				})
				.catch((error) => console.log(error));
			this.getAPIElement(addressURL, this.state.search)
				.then((data) => {
					if (JSON.stringify(data) !== '["Not found"]') {
						let newAddr = {
							hash: data.addrStr,
							transactions: data.transactions.length,
							balance: data.balance,
						};
						this.addSearchMatch('addr', newAddr);
					}
				})
				.catch((error) => console.log(error));
			this.getAPIElement('/api/assets?asset=', this.state.search + '*')
				.then((data) => {
					if (JSON.stringify(data) !== JSON.stringify([])) {
						for (let i = 0; i < data.length && i < 10; i++) {
							let newAsset = {
								hash: data[i],
							};
							this.addSearchMatch('asset', newAsset);
						}
					}
				})
				.catch((error) => console.log(error));
			if (!isNaN(this.state.search)) {
				this.getAPIElement(blockIndexURL, this.state.search)
					.then((data) => {
						this.getAPIElement(blockHashURL, data.blockHash)
							.then((data) => {
								if (JSON.stringify(data) !== '["Not found"]') {
									let newBlockByHash = {
										hash: data.hash,
										blockHeight: data.height,
										transactions: data.tx.length,
									};
									this.addSearchMatch('block', newBlockByHash);
								}
							})
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
			}
		}
	}

	searchClicked(props) {
		this.setStateElement(
			props.target.dataset.category,
			props.target.dataset.hash
		);
		this.clearSearch();
	}

	addSearchMatch(category, object) {
		const newSearchObject = {
			category: category,
			object: object,
		};
		const newSearchMatchList = [...this.state.searchMatch];

		newSearchMatchList.push(newSearchObject);

		this.setState({
			searchMatch: newSearchMatchList,
		});
	}

	//////////////////////
	//
	// Render, Router, Links
	//
	//////////////////////

	render() {
		return (
			<div>
				<nav>
					<Header
						handleChange={this.handleChange.bind(this)}
						searchMatch={this.state.searchMatch}
						searchClicked={this.searchClicked.bind(this)}
						search={this.state.search}
					/>
				</nav>
				<main>
					<Route
						path='/'
						exact
						render={(routerProps) => (
							<Home
								runningTransactions={this.state.runningTransactions}
								runningBlocks={this.state.runningBlocks}
								randomAssets={this.state.randomAssets}
							/>
						)}
					/>
					<Route
						path='/tx/:txHash'
						render={(routerProps) => {
							return (
								<Transaction
									match={routerProps.match}
									setStateElement={this.setStateElement.bind(this)}
									transaction={this.state.transaction}
								/>
							);
						}}
					/>
					<Route
						path='/block/:blockHash'
						render={(routerProps) => {
							return (
								<Block
									match={routerProps.match}
									setStateElement={this.setStateElement.bind(this)}
									block={this.state.block}
									transactions={this.state.transactions}
								/>
							);
						}}
					/>
					<Route
						path='/addr/:address'
						render={(routerProps) => {
							return (
								<Address
									match={routerProps.match}
									setStateElement={this.setStateElement.bind(this)}
									address={this.state.address}
									transactions={this.state.transactions}
								/>
							);
						}}
					/>
					<Route
						path='/asset/:asset'
						render={(routerProps) => {
							return (
								<Asset
									match={routerProps.match}
									setStateElement={this.setStateElement.bind(this)}
									asset={this.state.asset}
								/>
							);
						}}
					/>
				</main>
			</div>
		);
	}
}
export default App;

import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Transaction from './components/Transaction/Transaction';
import Block from './components/Block/Block';
import Header from './components/Header/Header';
import Address from './components/Address/Address';

const numTransactions = 10;
const numBlocks = 5;
const apiUrl = 'https://ravenexplorer.net';
// const apiUrl = 'http://192.168.1.21:3100';
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			transactions: [{ vin: [], vout: [] }],
			runningTransactions: [],
			transaction: { vin: [], vout: [] }, // include arrays for render before data load
			blocks: [],
			runningBlocks: [],
			block: { tx: [] }, // include arrays for render before data load
			address: { transactions: [] },
			search: '',
			searchMatch: [],
		};
	}

	addTransactionSet(transactionList) {
		const workingList = [...this.state.block.tx];
		const originalThis = this;

		const recursivePullTransaction = (txArray) => {
			if (txArray.length > 0) {
				let singleTx = txArray.pop();
				recursivePullTransaction(txArray);
				originalThis
					.getTransaction(singleTx)
					.then((tx) => originalThis.addTransaction(tx));
				// console.log(this);
			}
		};

		this.setState(
			{ transactions: [] },
			recursivePullTransaction(workingList)
			// console.log('hi')
		);
	}

	addTransaction(newTransaction) {
		const newTransactionsList = [newTransaction, ...this.state.transactions];
		this.setState({ transactions: newTransactionsList });
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

	addBlock(newBlockData) {
		const newBlocksList = [newBlockData, ...this.state.runningBlocks];

		// remove blocks if more than wanted in the list
		while (newBlocksList.length > numBlocks) {
			newBlocksList.pop();
		}

		this.setState({
			runningBlocks: newBlocksList,
		});
	}

	getAddress(address) {
		// returns transaction data based on transaction id
		return new Promise((resolve, reject) => {
			const transactionURL = apiUrl + '/api/addr/';
			fetch(transactionURL + address)
				.then((response) => response.json())
				.then((data) => {
					resolve(data);
				})
				.catch((error) => reject(error));
		});
	}

	setAddress(address) {
		this.getAddress(address)
			.then((data) => this.setState({ address: data }))
			.catch((error) => console.error(error));
	}

	setBlock(blockHash) {
		let originalThis = this;
		this.getBlockByHash(blockHash)
			.then((blockData) => {
				this.setState(
					{ block: blockData },
					() => originalThis.addTransactionSet(this.state.block.tx)

					// () => console.log(this.state.block.tx.length)
				);
			})
			.catch((error) => console.error(error));
	}

	getTransaction(txHash) {
		// returns transaction data based on transaction id
		return new Promise((resolve, reject) => {
			const transactionURL = apiUrl + '/api/tx/';
			fetch(transactionURL + txHash)
				.then((response) => response.json())
				.then((data) => {
					resolve(data);
				})
				.catch((error) => reject(error));
		});
	}

	setTransaction(txid) {
		this.getTransaction(txid)
			.then((txData) => this.setState({ transaction: txData }))
			.catch((error) => console.error(error));
	}

	getBlockByHeight(blockHeight) {
		// returns block hash based on eight
		return new Promise((resolve, reject) => {
			const blockHeightURL = apiUrl + '/api/block-index/';
			fetch(blockHeightURL + blockHeight)
				.then((response) => response.json())
				.then((data) => {
					resolve(data.blockHash);
				})
				.catch((error) => reject(error));
		});
	}

	getBlockByHash(blockHash) {
		// returns block detail when looking up by hash
		return new Promise((resolve, reject) => {
			const blockHashURL = apiUrl + '/api/block/';
			fetch(blockHashURL + blockHash)
				.then((response) => response.json())
				.then((data) => {
					resolve(data);
				})
				.catch((error) => reject(error));
		});
	}

	addFiveMostRecentBlocks() {
		const statusURL = apiUrl + '/api/status';
		let currentHeight = 0;
		let currentApp = this;

		fetch(statusURL)
			.then((response) => response.json())
			.then((data) => {
				currentHeight = data.info.blocks;
				this.getBlockByHeight(currentHeight - 4)
					.then((blockHash) => {
						this.getBlockByHash(blockHash)
							.then((blockData) => this.addBlock(blockData))
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
				currentApp
					.getBlockByHeight(currentHeight - 3)
					.then((blockHash) => {
						currentApp
							.getBlockByHash(blockHash)
							.then((blockData) => currentApp.addBlock(blockData))
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
				currentApp
					.getBlockByHeight(currentHeight - 2)
					.then((blockHash) => {
						currentApp
							.getBlockByHash(blockHash)
							.then((blockData) => currentApp.addBlock(blockData))
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
				currentApp
					.getBlockByHeight(currentHeight - 1)
					.then((blockHash) => {
						currentApp
							.getBlockByHash(blockHash)
							.then((blockData) => currentApp.addBlock(blockData))
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
				currentApp
					.getBlockByHeight(currentHeight)
					.then((blockHash) => {
						currentApp
							.getBlockByHash(blockHash)
							.then((blockData) => currentApp.addBlock(blockData))
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
			})
			.catch((error) => {
				console.error(error);
			});
	}

	io() {
		// this lazy function does nothing
		// but satisfies React when React wants to find a this.io function before
		// loading the websocket stuff
	}

	componentDidMount() {
		// get five last blocks and populate state
		this.addFiveMostRecentBlocks();

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
					.getTransaction(txData.txid)
					.then((txData) => originalThis.addRunningTransaction(txData))
					.catch((error) => console.log(error));
			});
			socket.on('block', function (blockHash) {
				originalThis
					.getBlockByHash(blockHash)
					.then((blockData) => originalThis.addBlock(blockData))
					.catch((error) => console.log(error));
			});
		}, 500); // delay here so that the socket js file can be loaded from remote
	}

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
			this.getBlockByHash(this.state.search)
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
			this.getTransaction(this.state.search)
				.then((data) => {
					if (JSON.stringify(data) !== '["Not found"]') {
						let newTx = {
							hash: data.txid,
							blockHeight: data.blockHeight,
							valueOut: data.valueOut,
						};
						this.addSearchMatch('tx', newTx);
					}
				})
				.catch((error) => console.log(error));
			this.getAddress(this.state.search)
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
			if (!isNaN(this.state.search)) {
				this.getBlockByHeight(this.state.search)
					.then((blockHash) => {
						this.getBlockByHash(blockHash)
							.then((blockHash) => {
								if (JSON.stringify(blockHash) !== '["Not found"]') {
									let newBlockByHash = {
										hash: blockHash.hash,
										blockHeight: blockHash.height,
										transactions: blockHash.tx.length,
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
		if (props.target.dataset.category === 'block') {
			this.setBlock(props.target.dataset.hash);
		} else if (props.target.dataset.category === 'tx') {
			this.setTransaction(props.target.dataset.hash);
		}
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
							/>
						)}
					/>
					<Route
						path='/tx/:txHash'
						render={(routerProps) => {
							return (
								<Transaction
									match={routerProps.match}
									setTransaction={this.setTransaction.bind(this)}
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
									setBlock={this.setBlock.bind(this)}
									block={this.state.block}
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
									setAddress={this.setAddress.bind(this)}
									address={this.state.address}
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

import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home/Home.js';

const numTransactions = 10;
const numBlocks = 5;
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			transactions: [],
			transaction: '',
			blocks: [],
			block: 0,
		};
	}

	io() {}

	addTransaction(newTransaction) {
		const newTransactionsList = [newTransaction, ...this.state.transactions];

		// remove transactions if more than 10 in the list
		while (newTransactionsList.length > numTransactions) {
			newTransactionsList.pop();
		}
		// this.setState({
		// 	transactions: newTransactionsList,
		// });

		console.log(typeof newTransactionsList);
	}

	addBlock(newBlockData) {
		const newBlocksList = [newBlockData, ...this.state.blocks];

		// remove blocks if more than wanted in the list
		while (newBlocksList.length > numBlocks) {
			newBlocksList.pop();
		}

		this.setState({
			blocks: newBlocksList,
		});
	}

	setBlock(blockHeight) {
		this.setState({ block: blockHeight });
	}

	getTransaction(txHash) {
		// returns transaction data based on transaction id
		console.log(txHash);
		return new Promise((resolve, reject) => {
			const transactionURL = 'https://ravenexplorer.net/api/tx/';
			fetch(transactionURL + txHash)
				.then((response) => response.json())
				.then((data) => {
					resolve(data);
				})
				.catch((error) => reject(error));
		});
	}

	getBlockByHeight(blockHeight) {
		// returns block hash based on eight
		return new Promise((resolve, reject) => {
			const blockHeightURL = 'https://ravenexplorer.net/api/block-index/';
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
			const blockHashURL = 'https://ravenexplorer.net/api/block/';
			console.log(blockHashURL + blockHash);
			fetch(blockHashURL + blockHash)
				.then((response) => response.json())
				.then((data) => {
					resolve(data);
				})
				.catch((error) => reject(error));
		});
	}

	addFiveMostRecentBlocks() {
		const statusURL = 'https://ravenexplorer.net/api/status';
		let currentHeight = 0;
		let currentBlocks = [];

		let currentApp = this;

		fetch(statusURL)
			.then((response) => response.json())
			.then((data) => {
				currentHeight = data.info.blocks;
				this.getBlockByHeight(currentHeight - 4)
					.then((blockHash) => {
						console.log(blockHash);
						this.getBlockByHash(blockHash)
							.then((blockData) => this.addBlock(blockData))
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
				currentApp
					.getBlockByHeight(currentHeight - 3)
					.then((blockHash) => {
						console.log(blockHash);
						currentApp
							.getBlockByHash(blockHash)
							.then((blockData) => currentApp.addBlock(blockData))
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
				currentApp
					.getBlockByHeight(currentHeight - 2)
					.then((blockHash) => {
						console.log(blockHash);
						currentApp
							.getBlockByHash(blockHash)
							.then((blockData) => currentApp.addBlock(blockData))
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
				currentApp
					.getBlockByHeight(currentHeight - 1)
					.then((blockHash) => {
						console.log(blockHash);
						currentApp
							.getBlockByHash(blockHash)
							.then((blockData) => currentApp.addBlock(blockData))
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
				currentApp
					.getBlockByHeight(currentHeight)
					.then((blockHash) => {
						console.log(blockHash);
						currentApp
							.getBlockByHash(blockHash)
							.then((blockData) => currentApp.addBlock(blockData))
							.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
			})
			.catch((error) => console.error(error));
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

			const socket = this.io('https://ravenexplorer.net');

			socket.on('connect', function () {
				// Join the room.
				socket.emit('subscribe', room);
			});
			socket.on('tx', function (txData) {
				originalThis
					.getTransaction(txData.txid)
					.then((txData) => originalThis.addTransaction(txData))
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

	render() {
		return (
			<div>
				<nav>
					<Link to='/'></Link>
				</nav>
				<main>
					<Route
						path='/'
						render={(routerProps) => (
							<Home
								transactions={this.state.transactions}
								blocks={this.state.blocks}
							/>
						)}
					/>
				</main>
			</div>
		);
	}
}
export default App;

//const socket = io("https://ravenexplorer.net");

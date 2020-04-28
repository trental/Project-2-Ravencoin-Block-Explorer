import React from 'react';
import { Link } from 'react-router-dom';

const RunningTransactions = (props) => {
	const list = props.transactions.map((tx) => {
		return (
			<p key={tx.txid}>
				<Link to={'/tx/' + tx.txid}>{tx.txid}</Link> {tx.valueOut} RVN
			</p>
		);
	});
	return <div>{list}</div>;
};

export default RunningTransactions;

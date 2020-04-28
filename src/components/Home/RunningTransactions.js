import React from 'react';

const RunningTransactions = (props) => {
	const list = props.transactions.map((tx) => {
		return (
			<p key={tx.txid}>
				{tx.txid} {tx.valueOut} RVN
			</p>
		);
	});
	return <div>{list}</div>;
};

export default RunningTransactions;

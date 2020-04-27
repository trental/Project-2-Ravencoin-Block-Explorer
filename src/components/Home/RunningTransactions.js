import React from 'react';

const RunningTransactions = (props) => {
	const list = props.transactions.map((txid) => {
		return <p key={txid}>{txid}</p>;
	});
	return <div>{list}</div>;
};

export default RunningTransactions;

import React from 'react';
import { Link } from 'react-router-dom';

const RunningTransactions = (props) => {
	const list = props.runningTransactions.map((tx) => {
		return (
			<div key={tx.txid} className='dataRow'>
				<div className='transactionItem'>
					<Link to={props.hostingURL + '/tx/' + tx.txid}>
						{tx.txid.length !== 1 ? tx.txid.substring(0, 40) + '...' : ''}
					</Link>
				</div>
				<div className='transactionItem'>
					{tx.valueOut} {tx.txid.length !== 1 ? 'RVN' : ' '}
				</div>
			</div>
		);
	});
	return (
		<>
			<div className='headerRow'>
				<div className='transactionItem'>Latest Transactions by Hash</div>
				<div className='transactionItem'>Value Out</div>
			</div>
			<div>{list}</div>
		</>
	);
};

export default RunningTransactions;

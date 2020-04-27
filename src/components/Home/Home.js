import React from 'react';
import RunningTransactions from './RunningTransactions';
import RunningBlocks from './RunningBlocks';

const Home = (props) => {
	return (
		<div>
			<RunningBlocks blocks={props.blocks} />
			<RunningTransactions transactions={props.transactions} />
		</div>
	);
};

export default Home;

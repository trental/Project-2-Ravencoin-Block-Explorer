import React from 'react';
import RunningTransactions from './RunningTransactions';
import RunningBlocks from './RunningBlocks';
import RandomAssets from './RandomAssets';

const Home = (props) => {
	return (
		<div>
			<RunningBlocks runningBlocks={props.runningBlocks} />
			<RunningTransactions runningTransactions={props.runningTransactions} />
			<RandomAssets randomAssets={props.randomAssets} />
		</div>
	);
};

export default Home;

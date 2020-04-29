import React from 'react';
import RunningTransactions from './RunningTransactions';
import RunningBlocks from './RunningBlocks';

const Home = (props) => {
	return (
		<div>
			<RunningBlocks runningBlocks={props.runningBlocks} />
			<RunningTransactions runningTransactions={props.runningTransactions} />
		</div>
	);
};

export default Home;

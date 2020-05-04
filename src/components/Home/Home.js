import React from 'react';
import RunningTransactions from './RunningTransactions';
import RunningBlocks from './RunningBlocks';
import RandomAssets from './RandomAssets';
import './Home.css';

const Home = (props) => {
	return (
		<div>
			<div className='homeSection runningBlocks'>
				<RunningBlocks
					runningBlocks={props.runningBlocks}
					hostingURL={props.hostingURL}
				/>
			</div>
			<div className='homeSection runningTransactions'>
				<RunningTransactions
					runningTransactions={props.runningTransactions}
					hostingURL={props.hostingURL}
				/>
			</div>
			<div className='homeSection randomAssets'>
				<RandomAssets
					randomAssets={props.randomAssets}
					hostingURL={props.hostingURL}
				/>
			</div>
		</div>
	);
};

export default Home;

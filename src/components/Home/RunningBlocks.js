import React from 'react';
import { Link } from 'react-router-dom';

const RunningBlocks = (props) => {
	const list = props.runningBlocks.map((block) => {
		return (
			<div key={block.height} className='dataRow'>
				<div className='blockItem'>
					<Link to={props.hostingURL + '/block/' + block.hash}>
						{block.height}
					</Link>
				</div>
				<div className='blockItem'>{block.tx.length}</div>
				<div className='blockItem'>{block.size}</div>
			</div>
		);
	});
	list.sort((a, b) => b.key - a.key);
	return (
		<>
			<div className='headerRow'>
				<div className='blockItem'>Latest Blocks by Height</div>
				<div className='blockItem'>Transactions</div>
				<div className='blockItem'>Size</div>
			</div>
			<div>{list}</div>
		</>
	);
};

export default RunningBlocks;

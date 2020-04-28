import React from 'react';
import { Link } from 'react-router-dom';

const RunningBlocks = (props) => {
	const list = props.blocks.map((block) => {
		return (
			<p key={block.height}>
				<Link to={'/block/' + block.hash}>{block.height}</Link>{' '}
				{block.tx.length}
			</p>
		);
	});
	return <div>{list}</div>;
};

export default RunningBlocks;

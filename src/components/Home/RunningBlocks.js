import React from 'react';

const RunningBlocks = (props) => {
	const list = props.blocks.map((block) => {
		return (
			<p key={block.height}>
				{block.height} {block.tx.length}
			</p>
		);
	});
	return <div>{list}</div>;
};

export default RunningBlocks;

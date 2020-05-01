import React from 'react';
import { Link } from 'react-router-dom';

const RandomAssets = (props) => {
	const list = props.randomAssets.map((asset) => {
		return (
			<div key={asset.name} className='dataRow'>
				<div className='assetItem'>
					<Link to={'/asset/' + asset.name}>{asset.name}</Link>
				</div>
				<div className='assetItem'>{asset.amount}</div>
				<div className='assetItem'>{asset.block}</div>
			</div>
		);
	});
	return (
		<>
			<div className='headerRow'>
				<div className='assetItem'>Random Assets</div>
				<div className='assetItem'>Amount</div>
				<div className='assetItem'>Creation Block</div>
			</div>
			<div>{list}</div>
		</>
	);
};

export default RandomAssets;

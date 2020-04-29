import React from 'react';
import { Link } from 'react-router-dom';

const RandomAssets = (props) => {
	const list = props.randomAssets.map((asset) => {
		return (
			<p key={asset}>
				<Link to={'/asset/' + asset}>{asset}</Link>
			</p>
		);
	});
	return <div>{list}</div>;
};

export default RandomAssets;

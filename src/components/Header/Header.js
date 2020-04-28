import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
	const list = props.searchMatch.map((item) => {
		return (
			<div key={item.object.hash}>
				{Object.keys(item.object).map((key) => {
					return (
						<Link
							to={'/' + item.category + '/' + item.object['hash']}
							key={key}
							onClick={props.searchClicked}>
							<span
								data-category={item.category}
								data-hash={item.object['hash']}
								key={key}>
								{item.object[key] + ' '}
							</span>
						</Link>
					);
				})}
			</div>
		);
	});
	return (
		<>
			<Link to='/'>Home</Link>
			<input
				placeholder='Search'
				onChange={props.handleChange.bind(this)}
				name='search'
				value={props.search}></input>
			<div>{list}</div>
		</>
	);
};

export default Header;

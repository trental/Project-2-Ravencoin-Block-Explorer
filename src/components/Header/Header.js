import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import './Header.css';

const Styles = styled.div`
	.navbar {
		background-color: #222;
	}

	.navbar-brand,
	.navbar-nav,
	.nav-link {
		color: #bbb;

		&:hover {
			color: white;
		}
	}
`;

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
		<Styles>
			<Navbar expand='lg' fixed='top'>
				<Navbar.Brand>
					<Link to='/'>Ravencoin Explorer</Link>
				</Navbar.Brand>
				<Nav className='ml-auto'>
					<input
						autoComplete='off'
						placeholder='Search for Block, Address, Transaction, or Asset'
						onChange={props.handleChange.bind(this)}
						name='search'
						value={props.search}></input>
					<div className='search-overlay'>{list}</div>
				</Nav>
			</Navbar>
		</Styles>
	);
};

export default Header;

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
	const list0 = props.searchTest[0].slice(0, 10).map((item) => (
		<div key={item}>
			<Link
				to={props.hostingURL + '/asset/' + props.convertToUrlNew(item)}
				onClick={props.searchClicked}
				data-category='asset'
				data-hash={item}>
				{'Asset: ' + item}
			</Link>
		</div>
	));
	const list1 =
		JSON.stringify(props.searchTest[1]) !== JSON.stringify(['Not found']) ? (
			<Link
				to={props.hostingURL + '/block/' + props.searchTest[1].blockHash}
				onClick={props.searchClicked}
				data-category='block'
				data-hash={props.searchTest[1].blockHash}>
				{'Block: ' + props.searchTest[1].blockHash.substring(0, 30) + '...'}
			</Link>
		) : (
			''
		);
	const list2 =
		JSON.stringify(props.searchTest[2]) !== JSON.stringify(['Not found']) ? (
			<Link
				to={props.hostingURL + '/block/' + props.searchTest[2].hash}
				onClick={props.searchClicked}
				data-category='block'
				data-hash={props.searchTest[2].hash}>
				{'Block: ' + props.searchTest[2].hash.substring(0, 30) + '...'}
			</Link>
		) : (
			''
		);
	const list3 =
		JSON.stringify(props.searchTest[3]) !== JSON.stringify(['Not found']) ? (
			<Link
				to={props.hostingURL + '/addr/' + props.searchTest[3].addrStr}
				onClick={props.searchClicked}
				data-category='address'
				data-hash={props.searchTest[3].addrStr}>
				{'Address: ' + props.searchTest[3].addrStr}
			</Link>
		) : (
			''
		);
	const list4 =
		JSON.stringify(props.searchTest[4]) !== JSON.stringify(['Not found']) ? (
			<Link
				to={props.hostingURL + '/tx/' + props.searchTest[4].txid}
				onClick={props.searchClicked}
				data-category='tx'
				data-hash={props.searchTest[4].txid}>
				{'Transaction: ' + props.searchTest[4].txid.substring(0, 30) + '...'}
			</Link>
		) : (
			''
		);

	return (
		<Styles>
			<Navbar expand='lg' fixed='top'>
				<Navbar.Brand>
					<Link to='/Project-2-Ravencoin-Block-Explorer/'>
						Ravencoin Explorer
					</Link>
				</Navbar.Brand>
				<Nav className='ml-auto'>
					<input
						autoComplete='off'
						placeholder='Search for Block, Address, Transaction, or Asset'
						onChange={props.handleChange.bind(this)}
						name='search'
						value={props.search}></input>
					<div className='search-overlay'>
						<div>{list1}</div>
						<div>{list2}</div>
						<div>{list3}</div>
						<div>{list4}</div>
						<div>{list0}</div>
					</div>
				</Nav>
			</Navbar>
		</Styles>
	);
};

export default Header;

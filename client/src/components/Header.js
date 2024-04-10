import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth2';

const Header = () => {
    return (
        <div className='ui secondary pointing menu'>
            <div className='toc item'>
                <i className='sidebar icon'></i>
            </div>
            <Link to='/' className='item'>
                Streamy
            </Link>
            <div className='right menu'>
                <Link to='/' className='item'>
                    All Streams
                </Link>
            </div>
            <GoogleAuth />
        </div>
    );
};

export default Header;

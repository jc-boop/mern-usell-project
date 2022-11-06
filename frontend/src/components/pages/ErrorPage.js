import React from 'react';
import '../../App.css';
import Footer from '../Footer'
import {Link} from 'react-router-dom'
import './ErrorPage.css';

function ErrorPage() {
    return (
        <>
        <div className='error-container'>
        <h0>Uh-oh... {'     '} <i className='fas fa-tag' /></h0>
        <h1>404: Page does not exist</h1>
        <p>You're lost...</p>
        <p>Perhaps, you've typed in something wrong?</p>
        <p>Anyways, here's the way home!</p>
        <Link 
            to="/" 
            className="myErrorButton"
            >Homepage
            </Link>

        </div>
        <Footer />
        </>
        
    );
}

export default ErrorPage;
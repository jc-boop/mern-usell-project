import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <div className='footer-container'>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <Link to='/some-text'> How it works</Link>
                        <Link to='/some-text'>Posting Rules</Link>
                        <Link to='/some-text'>Donate</Link>
                        <Link to='/some-text'>Terms of Service</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Support</h2>
                        <Link to='/some-text'>Contact us</Link>
                        <Link to='/some-text'>Report a post</Link>
                        <Link to='/some-text'>Edit your post</Link>
                        <Link to='/some-text'>How we use your data</Link>
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div>
                        <Link to='/' className="footer-logo">
                            Usell <i className='fas fa-tag'
                            ></i>
                        </Link>
                    </div>
                    <small className="copyright_text">Usell <i className="far fa-copyright"></i> 2021</small>
                    <div className="social-icons">
                        <a className="fab fa-facebook"
                        rel={'external'} 
                        target='_blank' 
                        href={"https://www.facebook.com"} />
                        <a className="fab fa-instagram"
                        rel={'external'} 
                        target='_blank' 
                        href={"https://www.instagram.com"} />
                        <a className="fab fa-youtube"
                        rel={'external'} 
                        target='_blank' 
                        href={"https://www.youtube.com"} />
                        <a className="fab fa-twitter"
                        rel={'external'} 
                        target='_blank' 
                        href={"https://www.twitter.com"} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer

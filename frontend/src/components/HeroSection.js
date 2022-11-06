import React from 'react';
import '../App.css';
import './HeroSection.css';
import {Link} from 'react-router-dom'

function HeroSection() {
  return (
    <div className='hero-container'>
      <h1>LIST YOUR ITEMS FOR FREE!</h1>
      <p>What are you waiting for?</p>

      <Link 
      to="/listings/" 
      className="myButtonLarge"
      >View Listings
      </Link>

      <Link 
      to="/post" 
      className="myButton"
      >Create a Posting
      </Link>
    </div>
  );
}

export default HeroSection;
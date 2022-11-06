import React from 'react';
import '../../App.css';
import Searchbar from '../SearchBar';
import ListingResults from '../ListingResults'
import Sort from '../Sort';
import Footer from '../Footer';
import '../HeroSection.css';

class Listings extends React.Component {
    render() {
        return (
            <>
            <div class="myPage">
                <h2 class ="headerText">Search results</h2>
                <Searchbar/>
                <Sort/>
            </div>
            <ListingResults phrase={this.props.match.params.phrase}/>
            <Footer/>
            </> 
        );
    }
}

export default Listings;
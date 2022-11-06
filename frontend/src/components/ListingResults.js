import React from 'react'
import SingleCard from './SingleCard'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './ListingResults.css'

class ListingResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listings: []
        }
        
    }

    componentDidMount = () => {
        this.getListings();
    }
    
    getListings = async () => {
        var term = this.props.phrase
        if(term !== undefined) {
            axios.get("/listings/?search=".concat(term))
            .then((response) => {
                const data = response.data;
                this.setState({ listings: data});
                console.log('Listing data received');
            })
            .catch(() => {
                console.log('Error retrieving data');
            });
        }
        else {
            axios.get("/listings/")
            .then((response) => {
                const data = response.data;
                this.setState({ listings: data});
                console.log('Listing data received');
            })
            .catch(() => {
                console.log('Error retrieving data');
            });
        }
        
    }

    displayListing = (listings) => {
        if (listings.length === 0) {
            return (<div class = "text-center mb-5">
            <h1 className='listingText'>Sorry! We don't have a listing like that.</h1>
            <h1 className='listingText'>You can see all our listings here</h1>
            <Link
            to="/listings/" 
            className='listingButton'
            >Listings
            </Link>
            </div>)
        }

        return listings.map((listing, index) => (
            <div class = "col-md-4 mb-5">
                <div key={index}>
                    <SingleCard
                    src={listing.listing_img}
                    price={listing.listing_price}
                    link={listing._id}
                    content={listing.listing_title}
                    />
                </div>
            </div>
        ));
    }

    render() {
    return (
        <div class = "container">
        <div class = "row justify-content-center mt-5">
        {this.displayListing(this.state.listings)}
        </div>
        </div>        
    )
    }

}
  
export default ListingResults;
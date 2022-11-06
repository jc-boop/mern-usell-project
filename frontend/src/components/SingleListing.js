import React from 'react';
import CommentSection from "./CommentSection";
import './SingleListing.css';
import {Link} from 'react-router-dom'
import moment from 'moment';
import Footer from './Footer'


class SingleListing extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listing_title: "",
      listing_comments: [],
      listing_price: 0,
      listing_category: "",
      listing_description: "",
      listing_img:"",
      date_posted: "",
      loading: true,
      id: 0,
    };
  }

  componentDidMount = () => this.getListing();
  
  getListing = async () => {
      this.setState({loading: true})
      const id = this.props.match.params.id
      const data = await fetch('/listings/'.concat(id));
      const listing = await data.json();
      const title = listing[0].listing_title
      const comments = listing[0].listing_comments
      const price = listing[0].listing_price
      const category = listing[0].listing_category
      const description = listing[0].listing_description
      const imgpath = listing[0].listing_img
      const date = moment(listing[0].date_posted).format('MMMM Do YYYY, h:mm:ss a');
      this.setState({listing_title: title, listing_price: price, listing_category: category, listing_description: description, date_posted: date, listing_comments: comments, listing_img: imgpath, id: id, loading: false})
  }

  render()
  {
    return (
      <section class = "singleList">
            <div class = "containerShow">
                <div class="row main-row p-2">
                    <div class="col-lg-4 col-md-12 col-sm-12">
                        <div class="photo">
                            <img src={this.state.listing_img} alt="list_img" class = "img-fluid"/>
                        </div>
                    </div>
                    <div class="sub1 col-lg-8" >
                        <div class ="itemName text-left">
                            <h2 class ="heading">{this.state.listing_title}</h2>
                        </div>
                        <div class ="price text-left">
                            <div class ="price">${this.state.listing_price}</div>
                        </div>
                        <div class ="category text-left mt-2">
                            <h6 class ="body">Category: {this.state.listing_category}</h6>
                        </div>
                        <div class ="date text-left">
                            <h6 class ="body mb-3">
                            Posted on: {this.state.date_posted}
                            </h6>
                        </div>
                        <div class ="description text-left">
                    <h2 class ="heading mt-3">Description</h2>
                            <p class ="body">
                            {this.state.listing_description}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row mian-row p-2">
                </div>
                <div class="row mian-row -2">
                <Link to={'/listing/edit/'+this.state.id} 
                className="myButton"
                >EDIT</Link>
                </div>
            </div>
            <div class="container">
            <CommentSection objId={this.state.id} commentList={this.state.listing_comments} loading = {this.state.loading}/>
         </div>
            <Footer />
        </section>
    );
  }
}

export default SingleListing;
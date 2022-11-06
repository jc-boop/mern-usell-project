import React from 'react';
import axios from 'axios'
import './EditListing.css'

class EditListing extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listing_title: "",
      listing_comments: [],
      listing_price: null,
      listing_category: "",
      listing_description: "",
      listing_img:"",
      date_posted: Date(),
      loading: true,
      id: 0,
      new_listing_title: "",
      new_listing_price: 0,
      new_listing_category: "",
      new_listing_description: "",
      listing_password:"",
      old_listing_password:""
    };

    this.changeTitle = this.changeTitle.bind(this)
    this.changePrice = this.changePrice.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.deleteListing = this.deleteListing.bind(this)
    this.updateListing = this.updateListing.bind(this)
  }

  changeTitle(event){
    this.setState({
      new_listing_title:event.target.value
    })
  }

  changePrice(event){
    const PRICE_MAX = 500000;
    const re = /^[0-9]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      if (event.target.value > PRICE_MAX) return;
      this.setState({
        new_listing_price:event.target.value
      });
    }
    return;
  }

  changeCategory(event){
    this.setState({
      new_listing_category:event.target.value
    })
  }

  changeDescription(event){
    this.setState({
      new_listing_description:event.target.value
    })
  }

  changePassword(event){
    this.setState({
      listing_password:event.target.value
    })
  }

  onEnter(event) {
    if (event.key === "Enter") event.preventDefault();
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
      const date = listing[0].date_posted
      const oldPassw = listing[0].listing_password
      this.setState({listing_title: title, listing_price: price, listing_category: category, listing_description: description, date_posted: date, listing_comments: comments, listing_img: imgpath, id: id, loading: false, new_listing_category: category, old_listing_password: oldPassw})
  }

  deleteListing = (event) => {
    event.preventDefault()
    if (!(this.state.listing_password === this.state.old_listing_password)){
      alert("Wrong password. Please try again.");
      return;
    }
    const formData = new FormData()
    formData.append('password', this.state.listing_password)
    axios.post('http://localhost:4000/delete/'.concat(this.state.id), formData)
      .then((response) => {
        console.log('Listing deleted');
      })
      .catch(() => {
        console.log('Listing deletion failed');
      });

    window.location.href = '/listings/'
  }

  updateListing = (event) => {
    event.preventDefault()
    if (!(this.state.listing_password === this.state.old_listing_password)){
      alert("Wrong password. Please try again.");
      return;
  }
    if(this.state.new_listing_title === "") {
      this.state.new_listing_title = this.state.listing_title
    }

    if(this.state.new_listing_price === 0) {
      this.state.new_listing_price = this.state.listing_price
    }

    if(this.state.new_listing_description === "") {
      this.state.new_listing_description = this.state.listing_description
    }

    const formData = new FormData()
    formData.append('title',this.state.new_listing_title)
    formData.append('price',this.state.new_listing_price)
    formData.append('category',this.state.new_listing_category)
    formData.append('description',this.state.new_listing_description)
    formData.append('password', this.state.listing_password)
    axios.put('http://localhost:4000/edit/'.concat(this.state.id), formData)
      .then(response => console.log(response.data)).catch(err=>console.log(err))
    window.location.href = "/uniquelisting/"+this.state.id
  }

  render() {
    
    return (
      <div class = "editContainer">
          <h2 class = "editHeaderText">Listing Details <i></i></h2>
          <p>
              <label class ="editTextText">Listing Title: <input type='text' name='title' 
              defaultValue={this.state.listing_title} onChange={this.changeTitle}></input></label>
          </p>
          <p>
              <label class ="editTextText">Listing Price: <input type='text' name='price' 
              defaultValue={this.state.listing_price} onChange={this.changePrice}></input></label>
          </p>
          <p>
              <label class ="editTextText">Listing Category: <select name='category' 
              value={this.state.new_listing_category} onChange={this.changeCategory} >
                <option>Select a category</option>
                <option value="Antiques">Antiques</option>
                <option value="Appliances">Appliances</option>
                <option value="Bicycles">Bicycles</option>
                <option value="Books">Books</option>
                <option value="Cars">Cars</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Health and Beauty">Health and Beauty</option>
                <option value="Household Items">Household Items</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Musical Instruments">Musical Instruments</option>
                <option value="Photo and video">Photo and video</option>
                <option value="Sports">Sports</option>
                <option value="Tools">Tools</option>
                <option value="Toys">Toys</option>
                <option value="Video Games">Video Games</option>
                <option value="Wanted">Wanted</option>
                </select>
                </label>
          </p>
          <p>
            <h6 class ="editTextText">Listing Description: </h6>
              <textarea
                  className="form-control"
                  name="description"
                  type="text"
                  defaultValue={this.state.listing_description}
                  value={this.state.description}
                  onChange={this.changeDescription}
                  rows="5"
                  
              />
          </p>
          <p>
              <label class ="editTextText">Listing Password: <input type='text' name='password' 
              value={this.state.listing_password} onChange={this.changePassword}></input></label>
          </p>
          <button 
          type="button" 
          class="update"
          onClick={this.updateListing}
          >Update
          </button>
          <button 
          type="button" 
          class="delete"
          onClick={this.deleteListing}
          >Delete
          </button>
      </div>
      );
  }
}

export default EditListing;
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import axios from 'axios'
import './PostSection.css'

class PostSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:'',
      price: '',
      category: "",
      description: "",
      password: "",
      file: null,
      validated: false,
    };

    this.changeTitle = this.changeTitle.bind(this)
    this.changePrice = this.changePrice.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeFile = this.changeFile.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeTitle(event){
    this.setState({
      title:event.target.value
    })
  }

  changePrice(event) {
    const PRICE_MAX = 500000;
    const re = /^[0-9]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      if (event.target.value > PRICE_MAX) return;
      this.setState({
        price: event.target.value,
      });
    }
    return;
    
  }

  changeCategory(event){
    this.setState({
      category:event.target.value
    })
  }

  changeDescription(event){
    this.setState({
      description:event.target.value
    })
  }

  changePassword(event){
    this.setState({
      password:event.target.value
    })
  }

  changeFile(event){
    this.setState({
      file:event.target.files[0]
    })
  }

  cancelPost(event) {
    event.preventDefault()
    window.location.reload(false);
  }

  onEnter(event) {
    if (event.key === "Enter") event.preventDefault();
  }

  onSubmit(event){
    event.preventDefault()
    
    event.target.className = "was-validated";
    if (!event.target.checkValidity()) {
      alert("Please check that all fields are correctly filled.");
      event.stopPropagation();
      return;
    } 
    else {
      if (this.state.file === null) {
        alert("An image is required! Please upload an image.");
        return;
      }
      this.setState({
        validated: true,
      });

    const formData = new FormData()
    formData.append('title',this.state.title)
    formData.append('price',this.state.price)
    formData.append('category',this.state.category)
    formData.append('description',this.state.description)
    formData.append('img',this.state.file)
    formData.append('password',this.state.password)
    axios.post('http://localhost:4000/addListing', formData)
      .then(response => console.log(response.data)).catch(err=>console.log(err))
    
    window.location.reload(false);
  }
  }

  render() {
    const TITLE_MIN = 8;
    const TITLE_MAX = 50;
    const PRICE_MAX = 500000;
    const DESCRIPTION_MIN = 10;
    const DESCRIPTION_LIMIT = 500;
    const PASS_LIMIT = 20;
    const PASS_MIN = 6;
  return (
    <div className="post-container">
      <Form
        style={{
          width: "80%",
          marginLeft: "10%",
          marginTop: "5%",
        }}
        className="needs-validation"
        noValidate
        validated={this.state.validated}
        onSubmit={this.onSubmit}
      >
        <h1 className="postHeaderText">Create a New Listing</h1>
        <Form.Group controlId="formTitle" className="postTextText">
          <Form.Label>Title of Listing</Form.Label>
          <Form.Control
            required
            minLength={TITLE_MIN}
            maxLength={TITLE_MAX}
            type="text"
            name="title"
            value={this.state.title}
            placeholder="Enter title"
            onChange={this.changeTitle}
            onKeyPress={this.onEnter}
          />
          <div className="invalid-feedback">
              Title is required ({TITLE_MIN}-{TITLE_MAX} characters)
          </div>
        </Form.Group>

        <Form.Group controlId="Category" className="postTextText">
          <Form.Label>Category</Form.Label>
          <Form.Control 
          as="select" 
          placeholder="Select a category"
          name="category"
          value={this.state.category}
          onChange={this.changeCategory}>
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
          </Form.Control>
          <div className="invalid-feedback">Please select a category.</div>
        </Form.Group>

        <Form.Group className="postTextText">
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              required
              type="text"
              name="price"
              value={this.state.price}
              placeholder="Enter amount"
              onChange={this.changePrice}
              onKeyPress={this.onEnter}
            />
            <div className="invalid-feedback">
              Please input a valid value (maximum of ${PRICE_MAX})
            </div>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="Description" className="postTextText">
          <Form.Label className="mt-3">Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={5}
            minLength={DESCRIPTION_MIN}
            maxLength={DESCRIPTION_LIMIT}
            name="description"
            value={this.state.description}
            placeholder="Enter a description"
            onChange={this.changeDescription}
          />
          {/* Display character limit for description section */}
          <Form.Text className="text-muted float-right">
            {this.state.description.length}/{DESCRIPTION_LIMIT}
          </Form.Text>
          <div className="invalid-feedback">
            A description is required ({DESCRIPTION_LIMIT} character limit)
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label className="postTextText">Password</Form.Label>
          <InputGroup>
            <Form.Control
              required
              name="password"
              value={this.state.password}
              type="text"
              minLength={PASS_MIN}
              maxLength={PASS_LIMIT}
              placeholder="Enter a password between 6-20 characters"
              onChange={this.changePassword}
              onKeyPress={this.onEnter}
            />
            <div className="invalid-feedback">
            Password is required
          </div>
          </InputGroup>
        </Form.Group>

        <form encType='multipart/form-data'>
            <div class="form-group mt-3">
                <label for="img">Upload image</label>
                <input type="file" name="img" id="img"
                className="custom-file-input"
                onChange={this.changeFile}
                />
            </div>
        </form>
        <button
            className="myButton-light"
            onClick={this.cancelPost}
          >
            Cancel
          </button>

          <button
            className="myButton"
            type="submit"
          >
            Submit
          </button>
      </Form>      
    </div>
  );
}
}

export default PostSection;
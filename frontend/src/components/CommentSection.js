import React from "react";
import { Form, Button, Collapse } from "react-bootstrap";
import axios from "axios";
import moment from 'moment';
import './CommentSection.css'

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      comment: "",
      hide: false,
      validated: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  handleHide(event) {
    this.setState({
      hide: !this.state.hide,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  onEnter(event) {
    if (event.key === 'Enter')
      event.preventDefault();
  }

  postComment(event) {
    event.preventDefault();
    event.target.className = "was-validated";

    if (!(event.target.checkValidity())) {
      event.stopPropagation();
      return;
    } else {
      this.setState({
        validated: true
      });
  
      const id = this.props.objId;
      const date = new Date()
      const url = "http://localhost:4000/addComment/".concat(id);
  
      axios
        .put(url, { name: this.state.user, comment: this.state.comment, date: date })
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
  
      window.location.reload();
    }
  }

  render() {
    const NAME_MIN = 3;
    const NAME_MAX = 20;
    const COMMENT_LIMIT = 100;
    return (
      <section class="Comments">
        <div class="container-fluid">
          <div class="row mb-5">
            <div class="col-md mr-4">
              <h2 class="textColor">Comments</h2>
              <Button
                variant="outline-dark"
                className="myButton-light"
                onClick={this.handleHide}
                aria-controls="comment-section"
                aria-expanded={this.state.hide}
              >
                <i
                  class={
                    this.state.hide
                      ? "fas fa-chevron-down"
                      : "fas fa-chevron-up"
                  }
                ></i>
              </Button>

              <Collapse class="mt-5" in={!this.state.hide}>
                <div id=" comment-section">
                  <div class="mt-4">
                    {!this.props.loading
                      ? this.props.commentList.map((commentList) => (
                          <div class="comBody p-3 mb-2 bg-light">
                            <h5>{commentList.name}</h5>
                            <i>{moment(commentList.date).format('l')}, {moment(commentList.date).format('LT')}</i>
                            <br />
                            <i>{commentList.comment}</i>
                          </div>
                        ))
                      : "Loading..."}
                  </div>
                </div>
              </Collapse>
            </div>
            <div class="writeBody mt-4">
              <h4 class="textColor mt-4">Leave a Comment</h4>
              <Form className="needs-validation" noValidate validated={this.state.validated} onSubmit={this.postComment}>
                <Form.Group controlId="Name">
                  <Form.Label class="textColor">Name</Form.Label>
                  <Form.Control
                    required
                    minLength={NAME_MIN}
                    maxLength={NAME_MAX}
                    type="text"
                    name="user"
                    value={this.state.user}
                    onChange={this.handleChange}
                    onKeyPress={this.onEnter}
                  />
                  <div className="invalid-feedback">
                    Name is required ({NAME_MIN}-{NAME_MAX} characters)
                  </div>
                </Form.Group>

                <Form.Group controlId="Comment">
                  <Form.Label class="textColor">Comment</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    maxLength={COMMENT_LIMIT}
                    name="comment"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />
                  <Form.Text className="text-muted float-right">
                    {(this.state.comment).length}/{COMMENT_LIMIT}
                  </Form.Text>
                  <div className="invalid-feedback">
                      Comment is required ({COMMENT_LIMIT} character limit)
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  className = "myButton"
                  variant="float-right mt-4 mb-5"
                >
                  Post
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default CommentSection;
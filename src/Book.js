import React, { Component } from 'react';

class Book extends Component {
  constructor(props) {
     super(props);
     this.state = {
      'value': this.props.bookDetails.shelf,
     };
   }
  // onClick(someParam) {
  //   this.props.onSelectCategory(value)
  // }

  changeBookStatus(event, updatedBook) {
    this.setState({value: event.target.value});
    console.log(updatedBook);
    this.props.handleShelfChange(updatedBook, event.target.value);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookDetails.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.value} onChange={(e) => this.changeBookStatus(e, this.props.bookDetails)}>
              <option value="move" disabled >Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.bookDetails.title}</div>
        <div className="book-authors">{this.props.bookDetails.authors[0]}</div>
      </div>
    );
  }
}

export default Book

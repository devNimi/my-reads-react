import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book.js'
import ShelfHeader from './ShelfHeader.js'

class Shelf extends Component {
  static propTypes = {
   shelfHeading: PropTypes.string.isRequired,
   bookList: PropTypes.array.isRequired
 }

  render() {
    return (
      <div className="bookshelf">
        <ShelfHeader shelfHeading={this.props.shelfHeading}/>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.bookList.map((book)=>{
                return <li key={book.id}>
                  <Book bookDetails={book} handleShelfChange={this.props.handleShelfChange}/>
                </li>
              })
            }
          </ol>
        </div>
      </div>
    );
  }
}


export default Shelf;

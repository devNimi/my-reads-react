import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book.js'
import ShelfHeader from './ShelfHeader.js'
import ShelfImages from './images/empty-shelf.jpg'

class Shelf extends Component {
  static propTypes = {
   shelfHeading: PropTypes.string.isRequired,
   bookList: PropTypes.array.isRequired
 }

  render() {
    return (
      <div className="bookshelf">
        <ShelfHeader shelfHeading={this.props.shelfHeading} shelfSubHeading={this.props.shelfSubHeading}/>
        {this.props.bookList.length === 0 && !this.props.onSearchPage ?
          (
            <div className="empty-shelf-container">
              <img className="empty-shelf-img" src={ShelfImages}/>
              <div className="empty-shelf-description">
                <p>Snap! nothing here😔</p>
                <p>Please add books📚 from the ➕ button below👇</p>
              </div>
            </div>
          )
          : (

            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  this.props.bookList.length > 0 && (
                    this.props.bookList.map((book)=>{
                      return <li key={book.id}>
                        <Book bookDetails={book} handleShelfChange={this.props.handleShelfChange}/>
                      </li>
                    })
                  )
                }
              </ol>
            </div>
          )
        }
      </div>
    );
  }
}


export default Shelf;

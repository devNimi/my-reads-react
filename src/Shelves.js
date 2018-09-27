import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Shelf from './Shelf.js'

class Shelves extends Component {
 //  static propTypes = {
 //   shelfHeading: PropTypes.string.isRequired,
 //   bookList: PropTypes.array.isRequired
 // }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* currentlyReading shelf */}
            <Shelf shelfHeading="Currently Reading" bookList={this.props.currentlyReading} handleShelfChange={this.props.handleShelfChange} onSearchPage={this.props.onSearchPage}/>
            {/* wantToRead shelf */}
            <Shelf shelfHeading="Want to Read" bookList={this.props.wantToRead} handleShelfChange={this.props.handleShelfChange} onSearchPage={this.props.onSearchPage}/>
            {/* Read shelf */}
            <Shelf shelfHeading="Read" bookList={this.props.read} handleShelfChange={this.props.handleShelfChange} onSearchPage={this.props.onSearchPage}/>


          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    );
  }
}


export default Shelves

import React, { Component } from 'react';
import {get, getAll, update, search} from './BooksAPI.js'
import PropTypes from 'prop-types'
import Shelf from './Shelf.js'

const bookArray = [];






class Shelves extends Component {
 //  static propTypes = {
 //   shelfHeading: PropTypes.string.isRequired,
 //   bookList: PropTypes.array.isRequired
 // }

 constructor(props) {
    super(props);
    this.state = {
      bookList: [],
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
  }

  componentDidMount() {
    //fetch book shelves data from backend
    getAll()
      .then(
        (response)=> {
          console.log(response);

          this.setState({bookList: response})
          // now load books in the shelves
          this.loadBooksInShelves();
        }
      )

      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  }

  loadBooksInShelves = () => {
    // clear out the shelfs
    let currentlyReading=[],wantToRead=[],read=[]
    // filter out bookshelf
    this.state.bookList.forEach((book)=>{
      // book is in currentlyReading shelf
      if (book.shelf === 'currentlyReading') {
        currentlyReading.push(book)
        // this.setState((state, props) => {
        //   return {currentlyReading: state.currentlyReading.concat(book)};
        // })
      };
      // book is in wantToRead shelf
      if (book.shelf === 'wantToRead') {
        // this.setState((state, props) => {
        //   return {wantToRead: state.wantToRead.concat(book)};
        // })
        wantToRead.push(book)
      };
      // book is in read shelf
      if (book.shelf === 'read') {
        // this.setState((state, props) => {
        //   return {read: state.read.concat(book)};
        // })
        read.push(book)
      };
    })
    // set state for sleves
    this.setState({currentlyReading, wantToRead, read })
  }

  handleShelfChange = (updatedBook, newSelfLocation) => {
    console.log(updatedBook, newSelfLocation);
    // make of a copy of current data, so if something goes wrong,
    // we can go back
    const newBookList = [];
    this.state.bookList.forEach((book)=>{
      if (book.id === updatedBook.id ) {
        book.shelf = newSelfLocation;
      }
      newBookList.push(book);
    })

    // let the Book API know
    update(updatedBook, newSelfLocation)
      .then(
        (response)=> {
          // everything's alright
          // update the state
          this.setState({bookList: newBookList});
          // update the shelves
          this.loadBooksInShelves();
        }
      )
      .catch(function(err) {
        console.log('Cannot contact server, try again', err);
      });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* currentlyReading shelf */}
            <Shelf shelfHeading="Currently Reading" bookList={this.state.currentlyReading} handleShelfChange={this.handleShelfChange}/>
            {/* wantToRead shelf */}
            <Shelf shelfHeading="Want to Read" bookList={this.state.wantToRead} handleShelfChange={this.handleShelfChange}/>
            {/* Read shelf */}
            <Shelf shelfHeading="Read" bookList={this.state.read} handleShelfChange={this.handleShelfChange}/>


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

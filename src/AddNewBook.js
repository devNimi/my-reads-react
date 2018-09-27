import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {get, search} from './BooksAPI.js'
import Shelf from './Shelf.js'
import Book from './Book.js'



class AddNewBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      requestedBooks: [],
      addNewBookHeading: 'Search & Add books in the shelves from here',
      addNewBookStatus: 'Please press enter after entering your search query',
    };
  }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event, searchedBook) {
      event.preventDefault();
      this.setState({
        addNewBookHeading: 'Searching...',
        addNewBookStatus: 'Please wait while we look for your book'
      })
      //fetch book shelves data from backend
      search(searchedBook)
        .then(
          (response)=> {
            if (response.error) {
            // there is error from backend, set requestedBooks to an empty array
            const noResults = [];
            this.setState(
              {
                requestedBooks: noResults,
                addNewBookHeading: 'Not found',
                addNewBookStatus: `We did not find anything on ${this.state.value}, please try with a diffrent query`,
              })
          } else {
            /* it went all fine, we got array of books
             * before setState requestedBooks = response
             * we need to check, if any book in the response array matches with the book already on our shelves i.e. this.props.bookList
             * we'll replace matched book in the response array with book already in the shelf
            */
            response.forEach((book, index)=>{
              const bookId = book.id
              if (bookId in this.props.bookListObject) {
                response[index] = this.props.bookListObject[bookId];
              }
            })
            this.setState({
              requestedBooks: response,
              addNewBookHeading: `${this.state.value}`,
              addNewBookStatus: `We found the follwing results on ${this.state.value}`,
            })
          }
          }
        )

        .catch(function(err) {
          console.log('Fetch Error :-S', err);
          this.setState({
            addNewBookHeading: `Something Went wrong`,
            addNewBookStatus: `Check your connectivity and try again`,
          })
        });

    }

    render() {
    return (
      <div className="app">
       <div className="search-books">
         <div className="search-books-bar">
           <Link className="close-search" to="/">Close</Link>
           <div className="search-books-input-wrapper">
             {/*
               NOTES: The search from BooksAPI is limited to a particular set of search terms.
               You can find these search terms here:
               https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
               However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
               you don't find a specific author or title. Every search is limited by search terms.
             */}
             <form onSubmit={(e)=>this.handleSubmit(e, this.state.value)}>
               <input type="text" value={this.state.value} onChange={(e)=>this.handleChange(e)} placeholder="Search by title or author"/>
            </form>
           </div>
         </div>
         <div className="search-books-results">
           {/* searched books shelf */}
           <Shelf shelfHeading={this.state.addNewBookHeading} shelfSubHeading={this.state.addNewBookStatus} bookList={this.state.requestedBooks} handleShelfChange={this.props.handleShelfChange} onSearchPage={this.props.onSearchPage}/>
         </div>
       </div>
      </div>
    )
  }
}

export default AddNewBook

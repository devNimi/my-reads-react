import React from 'react'
import { Route } from 'react-router-dom'
import {getAll, update} from './BooksAPI.js'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './Shelves.js'
import AddNewBook from './AddNewBook.js'
import AddButton from './AddButton.js'
class BooksApp extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       bookList: [],
       currentlyReading: [],
       wantToRead: [],
       read: [],
       bookListObject: {},
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
           this.updateBookListObject();
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
       };
       // book is in wantToRead shelf
       if (book.shelf === 'wantToRead') {
         wantToRead.push(book)
       };
       // book is in read shelf
       if (book.shelf === 'read') {
         read.push(book)
       };
     })
     // set state for sleves
     this.setState({currentlyReading, wantToRead, read })
   }

   updateBookListObject = () => {
    const updatedBookListObject = {}
    this.state.bookList.forEach((book)=>{
      updatedBookListObject[book.id] = book
    })

    this.setState({bookListObject: updatedBookListObject})
   }

   handleShelfChange = (updatedBook, newSelfLocation) => {
     // TODO: create a history like object, so we can revert back to previous starte, if something goes wrong
     const newBookList = [];
     // if a new book is added to shelf from AddNewBook page, add that book to array
     if (!this.state.bookList.includes(updatedBook)) {
       console.log('new book added');
       updatedBook.shelf = newSelfLocation;
       newBookList.push(updatedBook);
     }

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
           console.log('book updated');
           // everything's alright
           // update the state
           this.setState({bookList: newBookList});
           // update the shelves
           this.loadBooksInShelves();
           this.updateBookListObject();
         }
       )
       .catch(function(err) {
         console.log('Cannot contact server, try again', err);
       });
   }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <div className="app">
            <Shelves currentlyReading={this.state.currentlyReading} wantToRead={this.state.wantToRead} read={this.state.read} handleShelfChange={this.handleShelfChange} onSearchPage={false}/>
            <AddButton/>
          </div>
        )}/>
        <Route path='/add' render={()=> (
          <AddNewBook bookList={this.state.bookList} handleShelfChange={this.handleShelfChange} bookListObject={this.state.bookListObject} onSearchPage={true} />
        )} />
      </div>

    )
  }
}

export default BooksApp

import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
import BookmarkListItem from './BookmarkListItem';
import FilterComponent from './FilterComponent';
import loading from '../../../assets/img/loading.gif';

const BookmarkList = () => {

     const {bookmarkList} = useContext(GlobalContext);
  return (
    <>
    <FilterComponent/>
    <ul className='bookmarkListContainer'>
        {
          bookmarkList ?
            bookmarkList.map((bookmark, index) => {
                return <BookmarkListItem bookmark={bookmark} index={index}/>
              }) :
              
              <img 
              alt="loader" 
              className='loader-icon'
              width={30} 
              height={30} 
              src={chrome.runtime.getURL(loading)} 
              /> 
        }

    </ul>
    </>
  )
}

export default BookmarkList
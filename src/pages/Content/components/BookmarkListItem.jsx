import React, {useContext, useId, useState} from 'react'
import { GlobalContext } from '../context/GlobalState'

const BookmarkListItem = ({bookmark, index}) => {

    const{setBookmarkList, bookmarkList} = useContext(GlobalContext);

    const onDeleteClick = (e, id) => {
        e.preventDefault();
        setBookmarkList(prev => {
            chrome.storage.local.set({
                bookmarkList: prev.filter(item => (
                item.id !== id
                ))
        });
            return prev.filter(item => (
                item.id !== id
            ));
          });
      }

      const onItemClick = (e, url) => {
          e.preventDefault();
    history.replaceState( {}, "", url);

          //document.location.href = url;
      }

  return (
    <div className='bookmarkListItemWrapper' key={index} >
    {
        bookmark.icon == 'pull requests' ?
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd" 
              d="M5.5 3.5a1 1 0 11-2 0 1 1 0 012 0zm-.044 2.31a2.5 2.5 0 10-1.706.076v4.228a2.501 2.501 0 101.5 0V8.373a5.735 5.735 0 003.86 1.864 2.501 2.501 0 10.01-1.504 4.254 4.254 0 01-3.664-2.922zM11.5 10.5a1 1 0 100-2 1 1 0 000 2zm-6 2a1 1 0 11-2 0 1 1 0 012 0z"
            />
        </svg>
        :
        bookmark.icon == 'repos' ?
        <svg 
           width="16" 
           height="16" 
           viewBox="0 0 16 16" 
           xmlns="http://www.w3.org/2000/svg"
           >
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd" 
              d="M2.25 2a2 2 0 012-2H13a.75.75 0 01.75.75v10.5A.75.75 0 0113 12H7.5v1.5H13a.75.75 0 010 1.5H7.5v1H6v-1H4.5a2.25 2.25 0 01-2.25-2.25V2zM6 13.5V12H4.5a.75.75 0 000 1.5H6zm6.25-12v9H4.5c-.263 0-.515.045-.75.128V2a.5.5 0 01.5-.5h8z"
            />
        </svg>
        :
        bookmark.icon == 'files' ?
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          xmlns="http://www.w3.org/2000/svg"
        >
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd" 
              d="M12.5 6v8.5h-9v-13H8v2.75C8 5.216 8.784 6 9.75 6h2.75zm-.121-1.5L9.5 1.621V4.25c0 .138.112.25.25.25h2.629zM2 1a1 1 0 011-1h6.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V15a1 1 0 01-1 1H3a1 1 0 01-1-1V1z"
            />
       </svg>
       :
       bookmark.icon == 'issues' ?
       <svg 
         width="16" 
         height="16" 
         viewBox="0 0 16 16" 
         xmlns="http://www.w3.org/2000/svg"
         >
            <path 
               fill-rule="evenodd" 
               clip-rule="evenodd" 
               d="M2.5 12.25a1.5 1.5 0 001.5 1.5h8a1.5 1.5 0 001.5-1.5v-8a1.5 1.5 0 00-1.5-1.5H4a1.5 1.5 0 00-1.5 1.5v8zm1.5 3a3 3 0 01-3-3v-8a3 3 0 013-3h8a3 3 0 013 3v8a3 3 0 01-3 3H4zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.75a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3z"
            />
        </svg>
       : '' }
        
        <div className='bookMarkListItemDesc' onClick={(e) => onItemClick(e, bookmark.url)}>
            <span className='bookMarkListItemDescName' title={bookmark.name}>{bookmark.name}</span>
            <span className='bookMarkListItemDescUrl' title={bookmark.url}>{bookmark.url}</span>
        </div>

        <svg 
              width="16" 
              height="16" 
              className='delete-icon'
              onClick={(e) => onDeleteClick(e, bookmark.id)}
              viewBox="0 0 16 16" 
              xmlns="http://www.w3.org/2000/svg"
              >
               <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22z"
                />
             </svg>
    </div>
  )
}

export default BookmarkListItem
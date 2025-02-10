import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

const Search = () => {
   const{setIsSearch, setSearchValue, searchValue, isSearch} = useContext(GlobalContext);



   return (
       <div className='search-container'>
           <input 
             type='text' 
             onChange={(e) => setSearchValue(e.target.value.trim())}
             value={searchValue} 
             className='search-field' 
             placeholder='Search files'
            />
           {/* <img 
             src={chrome.runtime.getURL(closeIcon)}
             alt="close icon"
             className='close-icon'
             onClick={() => {
                setSearchValue('');
                setIsSearch(prev => !prev);
             }}
             width={17} 
             height={17}
            /> */}
            <svg 
              width="16" 
              height="16" 
              className='close-icon'
              onClick={() => {
               setSearchValue('');
               setIsSearch(prev => !prev);
            }}
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


export default Search
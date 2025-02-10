import React, { useEffect } from 'react'
import {getIconForFile} from '@gitlab/svgs'
import folderIcon from '../../../assets/img/sprite_icons/folder.svg'
import { onItemClick } from '../../../../utils/helpers'

const SearchListItem = ({result, index}) => {


  return (
    <div className='searchResultItemWrapper' key={index}>
        
           <li className='searchResultItem' onClick={(e) =>onItemClick(e, result.path , result.ref)}>
            {
       
           getIconForFile.getIconForFile(result.path.split('/')[result.path.split('/').length - 1]).length > 0 ?
           <img 
            src={chrome.runtime.getURL(require(`../../../assets/img/file_icons/${getIconForFile.getIconForFile(result.path.split('/')[result.path.split('/').length - 1])}.svg`))}
            alt="file icon"
            width={17}
            height={17}/> 
            :
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              xmlns="http://www.w3.org/2000/svg"
              style={{fill: 'currentcolor', color: 'rgb(59 130 246)'}}
              >
               <path 
                 fill-rule="evenodd" 
                 clip-rule="evenodd" 
                 d="M12.5 6v8.5h-9v-13H8v2.75C8 5.216 8.784 6 9.75 6h2.75zm-.121-1.5L9.5 1.621V4.25c0 .138.112.25.25.25h2.629zM2 1a1 1 0 011-1h6.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V15a1 1 0 01-1 1H3a1 1 0 01-1-1V1z"
               />
             </svg>
            }
               <span title={result.filename.split('/')[result.filename.split('/').length - 1]}>{result.filename.split('/')[result.filename.split('/').length - 1]}</span>
           </li>
           <span className='filePathText'>{result.path}</span>
    </div>
  )
}

export default SearchListItem
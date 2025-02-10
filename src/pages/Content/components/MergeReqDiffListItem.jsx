import React from 'react'
import {getIconForFile} from '@gitlab/svgs'


const MergeReqDiffListItem = ({file, index}) => {

    const onItemClick = () => {
        let url = document.location.href;
        let updatedUrl;
        url.split('/')[url.split('/').length - 1].split('#').length > 1 ?
        updatedUrl= url.split('#')[0]
        :
        url.split('/')[url.split('/').length -1] == 'diffs' ?
        updatedUrl = url.split('/').slice(0, url.split('/').length -1).join('/')
        :
        updatedUrl=url

    history.replaceState( {}, "", `${updatedUrl}/diffs`);

        //document.location.assign(`${updatedUrl}/diffs`);
    }

  return (
   
   <div className='mergeDiffListItem' key={index} onClick={() => onItemClick()}>
      {
       getIconForFile.getIconForFile(file.new_path).length > 0 ?
         <img 
           src={chrome.runtime.getURL(require(`../../../assets/img/file_icons/${getIconForFile.getIconForFile(file.new_path)}.svg`))}
           alt="file icon"
           style={{
            'marginLeft': '0.9rem'
           }}
           width={17}
           height={17}
        /> :
         <svg 
             width="16" 
             height="16" 
             viewBox="0 0 16 16" 
             xmlns="http://www.w3.org/2000/svg"
             style={{'fill': 'currentcolor', 'color': 'rgb(59 130 246)', 'marginLeft': '0.9rem'}}
             >
              <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M12.5 6v8.5h-9v-13H8v2.75C8 5.216 8.784 6 9.75 6h2.75zm-.121-1.5L9.5 1.621V4.25c0 .138.112.25.25.25h2.629zM2 1a1 1 0 011-1h6.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V15a1 1 0 01-1 1H3a1 1 0 01-1-1V1z"
              />
            </svg>
}
          <span title={file.new_path}>{ file.new_path.split('/').length > 1 ? file.new_path.split('/')[file.new_path.split('/').length - 1]: file.new_path}</span>
          
          {/* <div className='row_stats'>
          {
            file.diff.split('@@')[1].trim().split(' ').reverse().map((diff, index) => (
                <span 
                key={index}
                style={{
                    'display': 'inline-flex',
                    'color': `${(diff.split(',').length > 1 ? diff.split(',')[0]: diff).charAt(0) == '+' ? '#217645': '#DD2B0E'}`
                }}>
                  {diff.split(',').length > 1 ? diff.split(',')[0]: diff}
                </span>
            ))
          }
          </div> */}
    </div>
  )
}

export default MergeReqDiffListItem
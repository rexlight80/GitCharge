import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import MergeReqCommentsListItem from './MergeReqCommentsListItem';
import MergeReqDiffListItem from './MergeReqDiffListItem';
//import { getSingleCommit } from '../../../../utils/gitLabApi';
import loading from '../../../assets/img/loading.gif';



const MergeReqFilesList = () => {

    const{mergeReqComments, mergeReqDiffFiles, singleCommit} = useContext(GlobalContext);
    const[showMergeReqComments, setShowMergeReqComments] = useState(false);
    
  return (
    <div className='mergeReqFilesListWrapper'>
        <div className='mergeReqComments'>
        <span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            'fill': 'currentcolor',
            'color': '#000',
            'marginRight': '0.3rem'
          }}
        >
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd" 
              d="M2 0a2 2 0 00-2 2v10.06l1.28-1.28 1.53-1.53H4V11a2 2 0 002 2h7l1.5 1.5L16 16V6a2 2 0 00-2-2h-2V2a2 2 0 00-2-2H2zm8.5 4V2a.5.5 0 00-.5-.5H2a.5.5 0 00-.5.5v6.44l.47-.47.22-.22H4V6a2 2 0 012-2h4.5zm3.56 7.94l.44.439V6a.5.5 0 00-.5-.5H6a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h7.621l.44.44z"
            />
        </svg>
        Top Comments
        </span>
        <span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          xmlns="http://www.w3.org/2000/svg"
          className='commentIcon'
          onClick={() => setShowMergeReqComments(prev => !prev)}
        >
            <path 
              fill-rule="evenodd" 
              d="M3 2.5A1.5 1.5 0 001.5 4v6A1.5 1.5 0 003 11.5h1.5v1.6l2.067-1.462.194-.138H13a1.5 1.5 0 001.5-1.5V4A1.5 1.5 0 0013 2.5H3zM0 4a3 3 0 013-3h10a3 3 0 013 3v6a3 3 0 01-3 3H7.239l-3.056 2.162L3 16v-3a3 3 0 01-3-3V4z" 
              clip-rule="evenodd"
            />
        </svg>
          {
          mergeReqComments
          &&
          mergeReqComments.length
          }
        </span>

        </div>
        {
            showMergeReqComments 
            &&
            <div className='mergeReqCommentsList'>
                {
                  mergeReqComments.length > 0
                  ?
                  mergeReqComments.map((comment, index) => (
                        <MergeReqCommentsListItem comment= {comment} index={index}/>
                    )):
                    <img 
                    alt="loader" 
                    //className='loader-icon'
                    style={{
                      'margin': 'auto',
                      'zIndex': '2000'
                    }}
                    width={20} 
                    height={20} 
                    src={chrome.runtime.getURL(loading)} 
                    /> 
                }
             </div>   
        }
        <div className='mergeReqDiffDesc'>
            <span>
            <svg 
               width="16" 
               height="16" 
               viewBox="0 0 16 16" 
               xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M12.5 14.5V6H9.75A1.75 1.75 0 018 4.25V1.5H3.5v13h9zm-.121-10L9.5 1.621V4.25c0 .138.112.25.25.25h2.629zM2 1a1 1 0 011-1h6.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V15a1 1 0 01-1 1H3a1 1 0 01-1-1V1zm5.75 10.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zM6.28 6.22a.75.75 0 00-1.06 1.06L6.44 8.5 5.22 9.72a.75.75 0 101.06 1.06l1.75-1.75.53-.53-.53-.53-1.75-1.75z"
              />
            </svg>

            <span>{mergeReqDiffFiles.length}</span>

            files
            </span>
            <span>
              +{singleCommit.stats?.additions}
            </span>

            <span>
              -{singleCommit.stats?.deletions}
            </span>
        </div>
        <div className='mergeReqDiffList'>
             {
                mergeReqDiffFiles.map((file, index) => (
                    <MergeReqDiffListItem file={file} index={index}/>
                    
                ))

              
             }
        </div>

    </div>
  )
}

export default MergeReqFilesList
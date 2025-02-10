import React, { useContext } from 'react';
import moment from 'moment';
import { onPullReqListItemClick } from '../../../../utils/helpers';

const PullReqListItem = ({pullReq, index}) => {

  return (
    <div className='pullReqListItemWrapper' key={index} onClick={(e) => onPullReqListItemClick(e, pullReq.iid)}>
      <svg 
        width="16" 
        height="16"
        style={{
           fill: 'currentcolor',
           cursor: 'pointer',
           color: '#6BBC3B',
           width: '10%',
           height: '20'
        }}
        viewBox="0 0 16 16" 
        xmlns="http://www.w3.org/2000/svg">
         <path 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M10.34 1.22a.75.75 0 00-1.06 0L7.53 2.97 7 3.5l.53.53 1.75 1.75a.75.75 0 101.06-1.06l-.47-.47h.63c.69 0 1.25.56 1.25 1.25v4.614a2.501 2.501 0 101.5 0V5.5a2.75 2.75 0 00-2.75-2.75h-.63l.47-.47a.75.75 0 000-1.06zM13.5 12.5a1 1 0 11-2 0 1 1 0 012 0zm-9 0a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-3.25-2.386V5.886a2.501 2.501 0 111.5 0v4.228A2.501 2.501 0 016 12.5zm-1.5-9a1 1 0 11-2 0 1 1 0 012 0z"
          />
      </svg>
      <div className='pullReqListItemDesc'>
           <span title={pullReq.title} >{pullReq.title} 
           {
            pullReq.labels.map((label, index) => (
               <span className='pullReqLabel' key={index}>{label}</span>
            ))
           }
           </span>
           <span>
              #{pullReq.iid} opened {moment(pullReq.created_at).fromNow()} by {pullReq.author.name}
           </span>
      </div>
    </div>
  )
}

export default PullReqListItem
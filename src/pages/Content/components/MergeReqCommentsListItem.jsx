import React from 'react'
import moment from 'moment'

const MergeReqCommentsListItem = ({comment, index}) => {
    const onItemClick = () => {
        let url = document.location.href;
        let updatedUrl;
        url.split('/')[url.split('/').length -1] == 'diffs' ?
        updatedUrl = url.split('/').slice(0, url.split('/').length -1).join('/')
        :
        url.split('/')[url.split('/').length - 1].split('#').length > 1 ?
        updatedUrl= url.split('#')[0]
        :
        updatedUrl=url;
    history.replaceState( {}, "", `${updatedUrl}#note_${comment.id}`);


        //document.location.assign(`${updatedUrl}#note_${comment.id}`)

    }
  return (
    <a className='mergeCommentsListItem'  key={index} onClick={() => onItemClick()}>
    <div className='mergeCommentsDesc'><span title={comment.author.username}>{comment.author.username}</span><span>{moment(comment.created_at).fromNow()}</span></div> 
    <span className='mergeComments' title={comment.body}>{comment.body}</span>
    </a>
  )
}

export default MergeReqCommentsListItem
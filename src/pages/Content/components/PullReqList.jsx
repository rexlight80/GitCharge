import React, { useState, useEffect, useContext } from 'react'
import { getPullRequestTree } from '../../../../utils/gitLabApi';
import PullReqListItem from './PullReqListItem';
import loading from '../../../assets/img/loading.gif';
import { GlobalContext } from '../context/GlobalState';
import RequestSelectorList from './RequestSelectorList';
import { capitalise } from '../../../../utils/helpers';
import { ToastContainer, toast } from 'react-toastify';


const PullReqList = () => {
  const[pullReqList, setPullReqList] = useState([]);
  const[isOpened, setIsOpened] = useState(false);
  const[state, setState] = useState('all');
  const[error, setError] = useState(false);
  const{setShowMergedList} = useContext(GlobalContext);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

      (async () => {
        await chrome.storage.local.get('projectId', (res) => {
          if(Object.values(res).length > 0){
             getPullRequestTree(res.projectId, signal, state).then(res => {
              if(res){
                if(res.message == '401 Unauthorized'){
                   setError(true);
                }else{
                  setError(false)
                  setPullReqList(res);
                }
                }
             })
          }
        })
      })()

      return () => abortController.abort();

  }, [state]);

  useEffect(() => {
          if(error){
              toast.error('Unauthorized', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
              });
          }
       }, [error]);
  
  return (
    <div className='pullReqListWrapper'>
             <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                 rtl={false}
                 pauseOnFocusLoss
                 draggable
                 pauseOnHover
                theme="colored"
              />
      
      <div className='pullReqListHeader'>
      <div className='arrowShape'></div>
      <div className='requestSelectorContainer' onClick={() => setIsOpened(prev => !prev)}>
          <span>{capitalise(state)} pull requests</span>
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            xmlns="http://www.w3.org/2000/svg"
            className='trendDownIcon'
            >
              <path 
               d="M5.143 9.847a1 1 0 001.715 0l3.999-6.665a1 1 0 00-.858-1.515H2.001a1 1 0 00-.858 1.515l4 6.665z"
              />
            </svg>
          { isOpened && <RequestSelectorList setIsOpened={setIsOpened} setState={setState}/>}

      </div>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
              'marginLeft': 'auto',
              'marginRight': '0.5rem',
              'cursor': 'pointer',
               'width':'1.5rem'
            }}
            onClick={() => setShowMergedList(prev => !prev)}
          >
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd" 
              d="M4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22z"
            />
          </svg>
      </div>
      <div className='pullReqListContent'>
           {
            pullReqList.length > 0 ?
            pullReqList.map((pullReq,index) => (

              <PullReqListItem pullReq={pullReq} index={index}/> 
            )):
            <img 
            alt="loader" 
            //className='loader-icon'
            style={{
              'margin': 'auto',
              'zIndex': '2000'
            }}
            width={30} 
            height={30} 
            src={chrome.runtime.getURL(loading)} 
            /> 
           }
      </div>
    </div>
  )
}

export default PullReqList
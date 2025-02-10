import React ,{useState, useContext, useEffect, useLayoutEffect, useCallback} from 'react'
import TreeListItem from './TreeListItem'
import {GlobalContext} from '../context/GlobalState'
import loading from '../../../assets/img/loading.gif';
import { getRepositoryTree } from '../../../../utils/gitLabApi';
import { SettingsContext } from '../context/SettingsState';
import env from '../../../../utils/env';
import FontPicker from 'font-picker-react';
import { ToastContainer, toast } from 'react-toastify';


const TreeList = () => {
    const[repositoryTree, setRepositoryTree] = useState([]);
    const {searchValue, branch} = useContext(GlobalContext);
    const {fontFamily} = useContext(SettingsContext);
    const[error, setError] = useState(false);
    

    const RepositoryTree = useCallback(async (signal) => {
      await chrome.storage.local.get('projectId', (res) => {
        if(Object.values(res).length > 0 ){
          
          getRepositoryTree(res.projectId, branch,  undefined, signal).then(res => {
            if(res){
              if(res.message == '401 Unauthorized'){
                setError(true);
              }else{
                setError(false);
               setRepositoryTree(prev => {
                return res; 
              })
          }
        }
          }
        )
        }
      })
    }, [branch]);

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
         }, [error])

    useLayoutEffect(() => {
       chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
             
                if(request.projectId){
                    await chrome.storage.local.set({projectId: request.projectId});
                  }               
             });

          return () =>  {
            chrome.runtime.onMessage.removeListener();
          }
        }, [])

    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      RepositoryTree(signal);

      return () => abortController.abort()

    }, []);
    

return (
    <ul className='treeListContainer' >
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
      {
        fontFamily
        &&
        <div className='fontWrapper'>

          <FontPicker
                  // onChange={(nextFont) => setFontFamily(nextFont.family)}
                  apiKey={env.GOOGLE_FONT_API_KEY}
                  activeFontFamily={fontFamily}
              />
        </div>
      }
      <div>

      </div>
       {
         repositoryTree.length ? 
          
         repositoryTree.map((tree, index) => {
          
          return <TreeListItem tree={tree} index={index} />
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
  )
}

export default TreeList
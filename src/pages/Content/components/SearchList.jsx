import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { getSearchResults } from '../../../../utils/gitLabApi';
import SearchListItem from './SearchListItem';
import loading from '../../../assets/img/loading.gif';
import { ToastContainer, toast } from 'react-toastify';


const SearchList = () => {
     const[searchResults, setSearchResults] = useState([]);
     const[error, setError] = useState(false);
    const{searchValue} = useContext(GlobalContext);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal; 

        chrome.storage.local.get('projectId', (res) => {
            getSearchResults(res.projectId, searchValue, signal).then(res => {
                if(res){
                  if(res.message == '401 Unauthorized'){
                    setError(true);
                  }else{
                      setError(false);
                    setSearchResults(res);
                  }
                 }
                })
            })

        return () => abortController.abort();
    }, [searchValue]);

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
    <ul className='searchResultsWrapper'>
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
            searchResults && searchResults.length > 0 && !searchResults.message ?
            searchResults.map((result, index) => {
                return <SearchListItem result={result} index={index}/>
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

export default SearchList;
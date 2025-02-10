import { getRepositoryTree } from './gitLabApi';


const itemActive =  (path, type) => {
    let searchWord;
    let updatedUrlString;
    let url = document.location.href;
    let count = 0;

    if(new URL(url).pathname.split('/').length > 3){
        searchWord = url.search('blob') > 0 ? url.search('blob') : url.search('tree');
        
        updatedUrlString = url.substring(searchWord + 4).split('/').length > 2 ? 
                             url.substring(searchWord + 4).split('/').slice(2):
                             url.substring(searchWord + 4).split('/').slice(1)

        if(updatedUrlString[updatedUrlString.length - 1].split('?').length > 1) {
            updatedUrlString[updatedUrlString.length - 1] = updatedUrlString[updatedUrlString.length - 1].split('?')[0];
        }

        updatedUrlString.forEach((url) => {
            path.split('/').forEach((p) => {
                if(url === p){
                   count+=1;
                }
            })
        })
        
        return type == 'tree' ? path.split('/').length == count : updatedUrlString.join('/') ==  path
        
        
            
    }
}


const onItemClick = async (e, path, ref, type = 'blob') => {

    
    e.preventDefault();
   e.stopPropagation();
  
    if(document.querySelector('.ref-selector')){

        let branch =  document.querySelector('.ref-selector').children[0].textContent.toString().trim();

        
   if(path && branch && type){
    let url = document.location.href;
   let Url;
   let updatedUrl;

  //const [tab] =  await chrome.tabs.query({active: true, lastFocusedWindow: true});
   if(new URL(url).pathname.split('/').length > 3) {
   var searchWord = url.search(new URL(url).pathname.split('/')[4]);
  
    Url = url.substring(0, searchWord - 3);

   }else {

      Url = url;
   }
            
        updatedUrl = `${Url}/-/${type}/${branch}/${path}`;
        history.replaceState({}, "", updatedUrl);
    


}
        // await chrome.runtime.sendMessage({
        //     'path': path,
        //     'branch': branch,
        //     'type': type
        // })
    }else{

        if(path && ref && type){
            let url = document.location.href;
           let Url;
           let updatedUrl;
        
          //const [tab] =  await chrome.tabs.query({active: true, lastFocusedWindow: true});
           if(new URL(url).pathname.split('/').length > 3) {
           var searchWord = url.search(new URL(url).pathname.split('/')[4]);
          
            Url = url.substring(0, searchWord - 3);
        
           }else {
        
              Url = url;
           }

           updatedUrl = `${Url}/-/${type}/${ref}/${path}`;
    
           history.replaceState( {}, "", updatedUrl);
         
          
        
        
        }
        // await chrome.runtime.sendMessage({
        //     'path': path,
        //     'branch': ref,
        //     'type': type
        // })
    }
}

 const onPullReqListItemClick = async (e, id) => {
    e.preventDefault();
    
    if(id){
        let url = document.location.href;
       let Url;
       let updatedUrl;
    
      //const [tab] =  await chrome.tabs.query({active: true, lastFocusedWindow: true});
       if(new URL(url).pathname.split('/').length > 3) {
       var searchWord = url.search(new URL(url).pathname.split('/')[4]);
      
        Url = url.substring(0, searchWord - 3);
    
       }else {
    
          Url = url;
       }
     
    updatedUrl =`${Url}/-/merge_requests/${id}`;
    history.replaceState( {}, "", updatedUrl);    
    }
       
 }

 
 const getSubDirectory = async (id, path, signal) => {
    try{
       let res = await getRepositoryTree(id, path, signal);
       return res;
    //setSubDirectory(res);
    }catch(error){
        console.log('Error', error);
    }
} 

const showContainer = (showInPage) => {
    switch(showInPage) {
        case 'CodeAndPullRequest': 
            if(!((new URL(document.location.href).pathname.split('/').length == 3
               ||
               document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0)
               ||
             ((document.location.href.search('merge_requests') > 0 
               && 
             document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 )))){
                return 'hidden';
             }else{
                
                return 'visible';
             }
        case 'Code':
            if(!(new URL(document.location.href).pathname.split('/').length == 3
                     ||
            (document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0))){

                return 'hidden';
            }else{
                return 'visible';

            }
         case 'PullRequest':
            if(!(document.location.href.search('merge_requests') > 0 
               && 
             document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 )){
                
                return 'hidden';

            }else{
                

                return 'visible';
            }
          case 'All':
            return 'visible';
    }
   
}

const capitalise = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}



export {onItemClick, getSubDirectory, itemActive, onPullReqListItemClick, showContainer, capitalise}; 
import React, { useEffect, useContext, useRef, useLayoutEffect, useState } from 'react';
import './content.styles.css';
import chevronLgIcon from '../../assets/img/sprite_icons/chevron-lg-right.svg';
import { TreeList, Header, BookmarkList, MergeReqFilesList, SearchList, Footer } from './components';
import {GlobalContext} from './context/GlobalState';
import {v4 as uuidv4} from 'uuid';
import { getPullReqById, getSingleCommit, getTokenFromRefreshToken, myHeaders, getUserDetail } from '../../../utils/gitLabApi';
import { SettingsContext } from './context/SettingsState';
import {SettingsContent, SummarizeContent} from './components';
import { showContainer } from '../../../utils/helpers';
import { CLIENT_ID, CLIENT_SECRET, MELLOWTEL_PUBLIC_KEY } from '../../../utils/env';


const Content = () => {
    const {isPinned, isBookmark, showSummary, setBookmarkList, bookmarkSearchValue, typeValues, sortByValue, orderByValue,
      setMergeReqDiffFiles,setMergeReqComments, setMergeReq, mergeReqComments, mergeReqDiffFiles, searchValue, setIsPinned, setSingleCommit, setHtmlDocument, htmlDocument, setUserDetail, userDetail} = useContext(GlobalContext);
    
    const{ showSettings, setting, setSetting, setFontFamily} = useContext(SettingsContext);
    
    const box2Ref = useRef(null);



    useLayoutEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;


      chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

        if(request.text == "are_you_there_content_script?"){
          
          sendResponse({status: "yes"});

        }else if(request.accessToken){
        
          myHeaders.append('Authorization', `Bearer ${request.accessToken.access_token}`);
          getUserDetail(signal).then(data => {
           chrome.storage.local.set({'userDetail': data});
           setUserDetail(data);
          });
          await chrome.storage.local.set({'accessToken': request.accessToken});
        }
      })


      return () => {
        abortController.abort();
        chrome.runtime.onMessage.removeListener();
      }

    }, []);

    useEffect(() => {
      const abortController = new AbortController();
      
      chrome.storage.local.get('settings', (data) => {
        if(data.settings){
          setSetting(prev => {
            return { 
              ...prev, 
              accessToken: data.settings.accessToken, 
              sideBarHover: data.settings.sideBarHover,
              hotKeys: data.settings.hotKeys,
              showInSelect: data.settings.showInSelect,
              fontFamily: data.settings.fontFamily,
              fontSizeSelect: data.settings.fontSizeSelect,
              iconSelect: data.settings.iconSelect
            }
          })
          
        }
      });

      return () => abortController.abort();
    }, [showSettings]);


      useEffect(() => {

        const abortController = new AbortController();

        if(setting.accessToken.length > 0){
          myHeaders.delete('Authorization');

          myHeaders.append('Authorization', `Bearer ${setting.accessToken}`);
        }else{
          chrome.storage.local.get('accessToken',  (res) => {
            if(res.accessToken){
              if(myHeaders.get('Authorization') == null){
                myHeaders.append('Authorization', `Bearer ${res.accessToken.access_token}`);
  
              }
             setInterval(() => {
              getTokenFromRefreshToken(CLIENT_ID, CLIENT_SECRET, res.accessToken.refresh_token).then(async data => {
                await chrome.storage.local.set({'accessToken': data});
                myHeaders.delete('Authorization');
                
                myHeaders.append('Authorization', `Bearer ${data.access_token}`);
               })
  
            }, 7200 * 1000)
            }else{
                myHeaders.delete('Authorization');
              }
            });

        }

    return () => {
      abortController.abort();
      for (let i = 1; i < 99999; i++){
        clearInterval(i); 
      }
    }
      }, [userDetail, setting]);

      useEffect(() => {
        chrome.storage.local.get('userDetail', (res) => {
            if(res.userDetail){
             setUserDetail(res.userDetail);
            }
          });
        }, []);

        useLayoutEffect(() => {
          const abortController = new AbortController();
        
          const frame = document.createElement('iframe');
          const div = document.createElement('div');
          const body =  document.querySelector('body');
          div.id = 'testDiv';
          frame.className = 'frameCont';
          frame.sandbox = 'allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-downloads';
          const divContainer = document.getElementById('testDiv');
          
            if(body){
              body.after(div);
            }
            
            if(div){
              div.appendChild(frame);
            }

            return () => abortController.abort();
        
        }, [])

      useLayoutEffect(() => {
        const abortController = new AbortController();

        if(window){
          if(window.navigator.userAgent.includes("Firefox")){
            new MutationObserver(() => {
                   console.log(location.href);
                   
            }).observe(document, {subtree:true, childList:true});
          }else if(!window.navigator.userAgent.includes("Firefox")){
            window.navigation.addEventListener("navigate",  (event) => {
                const frame = document.querySelector('.frameCont');
        
                frame.onload = async(e) => { 
                  
                  let frameDoc = frame.contentDocument || frame.contentWindow.document;
                  
                  if(frameDoc !== null){
                    document.querySelector('#content-body').replaceWith(frameDoc.querySelector('#content-body'));                  
                    setHtmlDocument(document.querySelector('#content-body').innerHTML);
                    };
  
                };
                frame.src= event.destination.url; 
  
                })

          }
            }
            
            
        return () => {
          abortController.abort();
          if(!window.navigator.userAgent.includes("Firefox")){

            window.navigation.removeEventListener("navigate", () =>{})
          }
        }
      }, []);


      useEffect(() => {
        const abortController = new AbortController();

        const timer = setTimeout(() => {
          let lineText = document.querySelectorAll('code span');
            lineText.forEach((code, index) => {
                code.classList.add('apply-font');
                code.setAttribute('style', `font-size:${setting.fontSizeSelect}`);
            })
          
        }, 1000);

         return () => {
          clearTimeout(timer);
          abortController.abort();
         }
    
      }, [setting, htmlDocument]);

      useEffect(() => {
        const abortController = new AbortController();

        document.addEventListener('scroll', (event) =>  {
          chrome.storage.local.get('settings', (data) => {
            if(data.settings){
              document.querySelectorAll('code span').forEach((code, index) => {
                  code.classList.add('apply-font');
                  code.setAttribute('style', `font-size:${data.settings.fontSizeSelect}`);
              })
            }else{
              document.querySelectorAll('code span').forEach((code, index) => {
                code.classList.add('apply-font');
                code.setAttribute('style', `font-size:${setting.fontSizeSelect}`);
            })
            }
          });       
        })

        return () => {
            document.removeEventListener('scroll', () => {});
            abortController.abort();
        }
      }, [setting])
    
 
    useEffect(() => {
      const abortController = new AbortController();

        let panel = new URL(document.location.href).pathname.split('/').length == 3 ? 
         document.querySelector('.home-panel-title-row'):
        document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0 ?
         document.querySelector('.repo-breadcrumb') :
         document.location.href.search('merge_requests') > 0 
         && 
         document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 ?
         document.querySelector('.gl-heading-1'):
         document.location.href.search('issues') > 0 
         && 
         document.location.href.substring(document.location.href.search('issues')).split('/').length >= 2 ?
         document.querySelector('.gl-heading-1'): ''
         
        let span =  document.createElement('span');
        span.id = 'gitChargeBookmark';
        span.innerHTML = `<svg 
        width="16" 
        height="16"
        viewBox="0 0 16 16" 
        xmlns="http://www.w3.org/2000/svg"
        >
        <path 
        clip-path="evenodd"
        d="m8 9.293 1.06 1.06 3.44 3.44V2a.5.5 0 0 0-.5-.5H4a.5.5 0 0 0-.5.5v11.793l3.44-3.44L8 9.293Zm1.06 3.182 3.233 3.232c.63.63 1.707.184 1.707-.707V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13c0 .89 1.077 1.337 1.707.707l3.232-3.232L8 11.415l1.06 1.06Z"
        />
        </svg>`
  
  
        if(document.querySelector('#gitChargeBookmark svg') == null && panel.length !== 0){
  
          panel.append(span);
       }
     

       return () => abortController.abort();

     });

     useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      if(window){
        if(window.navigator.userAgent.includes("Firefox")){
          new MutationObserver(() => {
            const URL = location.href;
            if(URL.search('merge_requests') > 0 
            && 
            URL.substring(URL.search('merge_requests')).split('/').length >= 2){
              
              chrome.storage.local.get('projectId', (res) => {
                if(document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1].split('#').length > 1){
      
                  getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1].split('#')[0], 'files', signal).then(data => {
                     setMergeReqDiffFiles(data);
                  });
                  getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1].split('#')[0], signal).then(data => {
                    setMergeReqComments(data)
                  });
                  getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1].split('#')[0], 'Id', signal).then(data => {
                    if(data){
                    
                      getSingleCommit(res.projectId, data.pipeline?.sha, signal).then(res => {
                        if(Object.values(res).length > 0){
          
                          setSingleCommit(res)
                        }
                    })
                    }
                    setMergeReq(data);
                  });
                }else{
                  
                  getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1], 'files').then(data => {
                    setMergeReqDiffFiles(data);
                 });
                 getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1]).then(data => {
                   setMergeReqComments(data)
                 });
                 getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1].split('#')[0], 'Id').then(data => {
                  if(data){
      
                    getSingleCommit(res.projectId, data.pipeline?.sha, signal).then(res => {
                      if(Object.values(res).length > 0){
        
                        setSingleCommit(res)
                      }
                  })
                  }
                  setMergeReq(data)
                });
                }
              })
             
            }else{
              setMergeReq({});
            }
     }).observe(document, {subtree:true, childList:true});
        }else{
          window.navigation.addEventListener("navigate",  (event) => {
            const URL = event.destination.url;
        if(URL.search('merge_requests') > 0 
        && 
        URL.substring(URL.search('merge_requests')).split('/').length >= 2){
          
          chrome.storage.local.get('projectId', (res) => {
            if(document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1].split('#').length > 1){
  
              getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1].split('#')[0], 'files', signal).then(data => {
                 setMergeReqDiffFiles(data);
              });
              getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1].split('#')[0], signal).then(data => {
                setMergeReqComments(data)
              });
              getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1].split('#')[0], 'Id', signal).then(data => {
                if(data){
                
                  getSingleCommit(res.projectId, data.pipeline?.sha, signal).then(res => {
                    if(Object.values(res).length > 0){
      
                      setSingleCommit(res)
                    }
                })
                }
                setMergeReq(data);
              });
            }else{
              
              getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1], 'files').then(data => {
                setMergeReqDiffFiles(data);
             });
             getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1]).then(data => {
               setMergeReqComments(data)
             });
             getPullReqById(res.projectId, document.location.href.substring(document.location.href.search('merge_requests')).split('/')[1].split('#')[0], 'Id').then(data => {
              if(data){
  
                getSingleCommit(res.projectId, data.pipeline?.sha, signal).then(res => {
                  if(Object.values(res).length > 0){
    
                    setSingleCommit(res)
                  }
              })
              }
              setMergeReq(data)
            });
            }
          })
         
        }else{
          setMergeReq({});
        }
  
          });
       
        }
      }

      return () => {
      abortController.abort();
      if(!window.navigator.userAgent.includes("Firefox")){
        window.navigation.removeEventListener("navigate", () =>{})

      }

      }
        
     }, [htmlDocument]);




     useEffect(() => {
       const abortController = new AbortController();
       
       let bookmark =  document.querySelector('#gitChargeBookmark svg');
       
       if(bookmark){
         bookmark.children[0].setAttribute('fill-rule', 'evenodd');
         
         chrome.storage.local.get('bookmarkList').then(list => {
           if(list.bookmarkList && list.bookmarkList.length > 0){
             setBookmarkList(list.bookmarkList);
             list.bookmarkList.forEach(item => {
               if(item.url == document.location.href){
                 bookmark.children[0].setAttribute('fill-rule', 'nonzero');
                }
              });
            }
          }).finally(() => {
            
           if(bookmark.children[0].getAttribute('fill-rule') == 'evenodd'){
  
             bookmark.addEventListener('click', (e) => {
              e.preventDefault();
                bookmark.children[0].setAttribute('fill-rule', 'nonzero');
             
                     setBookmarkList((prev) => {

                              if(prev){
                                chrome.storage.local.set({ bookmarkList: [...prev,  {
                                       id: uuidv4(),
                                       date: Date.now(),
                                       name: new URL(document.location.href).pathname.split('/').length == 3 ?
                                                 new URL(document.location.href).pathname:
                                               document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0 ?
                                               document.location.href.substring(document.location.href.search('blob') > 0 ? 
                                               document.location.href.search('blob'): document.location.href.search('tree')):
                                               document.location.href.search('merge_requests') > 0 
                                               && 
                                               document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 ?
                                               document.querySelector('.gl-heading-1').innerText:
                                               document.location.href.search('issues') > 0 
                                               && 
                                               document.location.href.substring(document.location.href.search('issues')).split('/').length >= 2 ?
                                               document.querySelector('.gl-heading-1').innerText: '',
                                       url: document.location.href,
                                       icon: new URL(document.location.href).pathname.split('/').length == 3 ?
                                               'repos':
                                               document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0 ?
                                               'files':
                                               document.location.href.search('merge_requests') > 0 
                                               && 
                                               document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 ?
                                               'pull requests':
                                               document.location.href.search('issues') > 0 
                                               && 
                                               document.location.href.substring(document.location.href.search('issues')).split('/').length >= 2 ?
                                               'issues':
                                               ''
                                      }]}
                                    );

                                    return [...prev,  {
                                      id: uuidv4(),
                                      date: Date.now(),
                                       name: new URL(document.location.href).pathname.split('/').length == 3 ?
                                                 new URL(document.location.href).pathname:
                                               document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0 ?
                                               document.location.href.substring(document.location.href.search('blob') > 0 ? 
                                               document.location.href.search('blob'): document.location.href.search('tree')):
                                               document.location.href.search('merge_requests') > 0 
                                               && 
                                               document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 ?
                                               document.querySelector('.gl-heading-1').innerText:
                                               document.location.href.search('issues') > 0 
                                               && 
                                               document.location.href.substring(document.location.href.search('issues')).split('/').length >= 2 ?
                                              document.querySelector('.gl-heading-1').innerText: '',
                                       url: document.location.href,
                                       icon: new URL(document.location.href).pathname.split('/').length == 3 ?
                                               'repos':
                                               document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0 ?
                                               'files':
                                               document.location.href.search('merge_requests') > 0 
                                               && 
                                               document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 ?
                                               'pull requests':
                                               document.location.href.search('issues') > 0 
                                               && 
                                               document.location.href.substring(document.location.href.search('issues')).split('/').length >= 2 ?
                                               'issues':
                                               ''
                                     }]

                              }else{
                                chrome.storage.local.set({ bookmarkList: [{
                                  id: uuidv4(),
                                  date: Date.now(),
                                  name: new URL(document.location.href).pathname.split('/').length == 3 ?
                                            new URL(document.location.href).pathname:
                                          document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0 ?
                                          document.location.href.substring(document.location.href.search('blob') > 0 ? 
                                          document.location.href.search('blob'): document.location.href.search('tree')):
                                          document.location.href.search('merge_requests') > 0 
                                          && 
                                          document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 ?
                                          document.querySelector('.gl-heading-1').innerText:
                                          document.location.href.search('issues') > 0 
                                          && 
                                          document.location.href.substring(document.location.href.search('issues')).split('/').length >= 2 ?
                                          document.querySelector('.gl-heading-1').innerText: '',
                                  url: document.location.href,
                                  icon: new URL(document.location.href).pathname.split('/').length == 3 ?
                                          'repos':
                                          document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0 ?
                                          'files':
                                          document.location.href.search('merge_requests') > 0 
                                          && 
                                          document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 ?
                                          'pull requests':
                                          document.location.href.search('issues') > 0 
                                          && 
                                          document.location.href.substring(document.location.href.search('issues')).split('/').length >= 2 ?
                                          'issues':
                                          ''
                                 }]}
                               );

                               return [{
                                id: uuidv4(),
                                date: Date.now(),
                                 name: new URL(document.location.href).pathname.split('/').length == 3 ?
                                           new URL(document.location.href).pathname:
                                         document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0 ?
                                         document.location.href.substring(document.location.href.search('blob') > 0 ? 
                                         document.location.href.search('blob'): document.location.href.search('tree')):
                                         document.location.href.search('merge_requests') > 0 
                                         && 
                                         document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 ?
                                         document.querySelector('.gl-heading-1').innerText:
                                         document.location.href.search('issues') > 0 
                                         && 
                                         document.location.href.substring(document.location.href.search('issues')).split('/').length >= 2 ?
                                        document.querySelector('.gl-heading-1').innerText: '',
                                 url: document.location.href,
                                 icon: new URL(document.location.href).pathname.split('/').length == 3 ?
                                         'repos':
                                         document.location.href.search('blob') > 0 || document.location.href.search('tree') > 0 ?
                                         'files':
                                         document.location.href.search('merge_requests') > 0 
                                         && 
                                         document.location.href.substring(document.location.href.search('merge_requests')).split('/').length >= 2 ?
                                         'pull requests':
                                         document.location.href.search('issues') > 0 
                                         && 
                                         document.location.href.substring(document.location.href.search('issues')).split('/').length >= 2 ?
                                         'issues':
                                         ''
                               }]
                              }
                            })
                          });
                        }
                      });
                    }
               return () => abortController.abort();
              }, [htmlDocument]);
    

    useEffect(() => {
      chrome.storage.local.get('bookmarkList').then(list => {
        setBookmarkList(prev => {
          if( bookmarkSearchValue.length > 0){
            return  prev.filter(data => data.name.toLowerCase().includes(bookmarkSearchValue.toLowerCase()));
          }else{
          return list.bookmarkList;
        }
      })
    })
  }, [bookmarkSearchValue]);

    useEffect(() => {
      chrome.storage.local.get('bookmarkList').then(list => {
        setBookmarkList(prev => {
          if(typeValues.length > 0){
          prev = list.bookmarkList;
          return prev.filter(data => typeValues.toString().toLowerCase().includes(data.icon))
          } else{
            return list.bookmarkList;
          }
      
        })
      }
    )}, [typeValues]);

    useEffect(() => {
       if(sortByValue.length > 0){
      setBookmarkList(prev => {
        if(sortByValue == 'Name'){
          return  prev.sort((a, b) => {
             if (a.name.toUpperCase() < b.name.toUpperCase()) {
               return -1;
             }
             if (a.name.toUpperCase() >b.name.toUpperCase()) {
               return 1;
             }

             return 0;
            })
          }else if(sortByValue == 'URL'){
        return  prev.sort((a, b) => {
          if (a.url< b.url) {
            return -1;
          }
          if (a.url >b.url) {
            return 1;
          }
            return 0;
         })
      }else if(sortByValue == 'Date'){
        return  prev.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
            return 0;
         })
        }
      })
    }
  }, [sortByValue]);

  useEffect(() => {
    if(orderByValue.length > 0 ){
    setBookmarkList(prev => {
      if(orderByValue == 'Ascending'){
        return  prev.sort();
      }else if(orderByValue == 'Descending'){
        return  prev.sort().reverse();

      }
    })
  }
  }, [orderByValue]);


  useEffect(() => {
    const abortController = new AbortController();

    document.addEventListener('keypress', (e) => {
      if(e.key == setting.hotKeys){
         setIsPinned(prev => !prev);
      }
    })
    return () => {
      abortController.abort();
      document.removeEventListener('keypress', () =>{});
    }

  }, [setting]);

  useEffect(() => {
   setFontFamily(prev => {
    return setting.fontFamily
   })
  }, [setting])

  
  useEffect(() => {
    if(setting){
          
    if(!(setting.sideBarHover)){
    box2Ref.current.addEventListener('click', (e) => {
          document.querySelector('.git-container_click').setAttribute("style", "left:0;");
        });
    
        document.querySelector('.git-container_click').addEventListener('mouseleave', () => {
        document.querySelector('.git-container_click').removeAttribute("style", "left:0;");
        })
      }else{
        document.querySelector('.git-container').removeAttribute("style", "left:0;");
      }
    }
      }, [setting]);

  

     
return (
    <div  className= {`${setting.sideBarHover ? 'git-container': 'git-container_click'} ${isPinned ? 'pinned': 'notpinned'}`}>
      <div className='box_1-container'>
          <Header/>
            
         <div className="box_1">
          {
            isBookmark ?
            <BookmarkList/>:
            ( 
              document.location.href.search('merge_requests') > 0
              && 
              (mergeReqDiffFiles?.length > 0 || mergeReqComments?.length > 0) && !showSettings
            ) ?
            <MergeReqFilesList/>:
            searchValue.length > 0 ?
            <SearchList/>:
            showSettings?
            <SettingsContent/>:
            showSummary?
            <SummarizeContent/>:
            <TreeList/>
          }
         </div>
         <Footer/>
      </div>
      <div ref={box2Ref} className= {`box_2 ${isPinned ? 'disappear': ''}`} style={{visibility: showContainer(setting.showInSelect)}}>
        <span className='tag_word'><span className='special_word'>Git</span>Charge</span>
          <img 
              alt="forward icon"
              className='forward-icon'
              width={12} 
              height={12} 
              src={chrome.runtime.getURL(chevronLgIcon)} 
            /> 
      </div>
    </div>
  );
}

export default Content;

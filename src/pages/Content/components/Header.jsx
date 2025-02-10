import React, { useContext, useState, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'
import branchIcon from '../../../assets/img/sprite_icons/branch.svg'
import documentIcon from '../../../assets/img/sprite_icons/documents.svg';
import Search from './Search';
import PullReqList from './PullReqList';
import { SettingsContext } from '../context/SettingsState';


const Header = () => {
    const {isPinned, setIsPinned, isSearch, isBookmark, showMergedList, setIsSearch, setIsAllExpanded, isAllExpanded, setIsBookmark, setShowMergedList, mergeReq, branch, setBranch, showSummary, setShowSummary, htmlDocument} = useContext(GlobalContext);
    const {showSettings, setShowSettings} = useContext(SettingsContext)
    const [desc, setDesc] = useState([]);

    
    
    useEffect(() => {
      (async () =>  {
        let breadCrumbItems = await document.querySelectorAll('.gl-breadcrumb-item');
            
             setBranch(prev => {
              if(document.querySelector('.ref-selector')){
                  return document.querySelector('.ref-selector').children[0].textContent.toString().trim();
              }else if(document.location.href.search('merge_requests') > 0){
                if(Object.values(mergeReq).length > 0){

                  return mergeReq.target_branch;
                }
              }
             })       
                
            if(breadCrumbItems.length > 1){
                breadCrumbItems.forEach(item => {
                   setDesc(prev => [...prev, 
                    {
                      name: item.children[0].textContent,
                      link: item.children[0].href
                    }])
                });
              }

        })()
     
    }, [mergeReq, htmlDocument]);

  return (
    <div className='box_1-header'>
        {
            isSearch ? <Search/> : 
            <>
            <div className='header_desc'>
              {
                isBookmark ?
                <span className='bookmarksHeaderText'>Bookmarks</span>
                :
                showSettings?
                <span className='settingsHeaderText'>Settings</span>
                :
                showSummary?
                <span className='summarizeHeaderText'>Summarize</span>
                :
                <>
                <div className='header_desc_dir'>
                <img 
                  alt="folderTree icon"
                  className='folderTree-icon'
                  width={16} 
                  height={16} 
                  src={chrome.runtime.getURL(documentIcon)} 
                /> 
                 <span className='repoDesc'>
                        <a alt= 'group' title={desc.length && desc[0].name} className='link' href={desc.length && desc[0].link}>{desc.length && desc[0].name}</a>
                        /
                        <a alt='project' title = {desc.length && desc[1].name} className='link' onClick={() =>  history.replaceState( {}, "", `${desc.length && desc[1].link}`)} 
                        //href= {desc.length && desc[1].link}
                        >{ desc.length && desc[1].name}</a>
                 </span>
                </div>
                {
                branch?.length > 0
                &&
                <div className='header_desc_branch'>
                <img 
                  alt="gitBranch icon"
                  className='gitBranch-icon'
                  width={16} 
                  height={16}
                  style={{
                    'marginRight': '0.2rem'
                  }} 
                  src={chrome.runtime.getURL(branchIcon)} 
                />
                  <span className='branch' title={branch}>{branch}</span>
                  {
                   Object.values(mergeReq)?.length > 0 
                   &&
                   <>
                     <svg 
                     width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      'minWidth': '16',
                      'maxWidth': '16'

                    }}
                    >
                      <path 
                        fill-rule="evenodd" 
                        clip-rule="evenodd" 
                        d="M9.78 4.22a.75.75 0 010 1.06L7.06 8l2.72 2.72a.75.75 0 11-1.06 1.06L5.47 8.53a.75.75 0 010-1.06l3.25-3.25a.75.75 0 011.06 0z"
                      />
                    </svg>
                   <span className='mergeReqTitle' title={mergeReq.source_branch}> 
                    {mergeReq.source_branch}
                   </span>
                   </>
                   }
                </div>
                }
                </>
              }
            </div>
            <div className='header_icons'>
        
             <svg 
               width="16" 
               height="16"
               className='search-icon'
               viewBox="0 0 16 16" 
               xmlns="http://www.w3.org/2000/svg"
               onClick={() => setIsSearch(prev => !prev)}
               >
                <path 
                  fill-rule="evenodd" 
                  clip-rule="evenodd" 
                  d="M11.5 7a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
                  />
              </svg>

              <svg 
              className={`expandAll-icon ${isAllExpanded ? 'isAllExpanded': ''}`}
              onClick={() => setIsAllExpanded(prev => !prev)}
              width="16" 
              height="16"  
              viewBox="0 0 16 16" 
              xmlns="http://www.w3.org/2000/svg">
               <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M11.78 11.16a.75.75 0 00-1.06 0l-1.97 1.97V2.87l1.97 1.97a.75.75 0 101.06-1.06L8.53.53 8 0l-.53.53-3.25 3.25a.75.75 0 001.06 1.06l1.97-1.97v10.26l-1.97-1.97a.75.75 0 00-1.06 1.06l3.25 3.25L8 16l.53-.53 3.25-3.25a.75.75 0 000-1.06z"
                />
                </svg>

                <svg 
                  width="16" 
                  height="16"
                  onClick={() => setIsBookmark(prev => !prev)} 
                  viewBox="0 0 16 16" 
                  className={`bookmark-icon ${isBookmark ? 'isBookmarked':''}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fill-rule="evenodd" 
                    clip-rule="evenodd" 
                    d="M8 9.293l1.06 1.06 3.44 3.44V2a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v11.793l3.44-3.44L8 9.293zm1.06 3.182l3.233 3.232c.63.63 1.707.184 1.707-.707V2a2 2 0 00-2-2H4a2 2 0 00-2 2v13c0 .89 1.077 1.337 1.707.707l3.232-3.232L8 11.415l1.06 1.06z"
                  />
                </svg>

                {/* <svg 
                  width="16" 
                  height="16"
                  className={`merge-icon ${showMergedList ? 'showMergedList': ''}`} 
                  onClick={() => setShowMergedList(prev => !prev)}
                  viewBox="0 0 16 16" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fill-rule="evenodd" 
                    clip-rule="evenodd" 
                    d="M10.34 1.22a.75.75 0 00-1.06 0L7.53 2.97 7 3.5l.53.53 1.75 1.75a.75.75 0 101.06-1.06l-.47-.47h.63c.69 0 1.25.56 1.25 1.25v4.614a2.501 2.501 0 101.5 0V5.5a2.75 2.75 0 00-2.75-2.75h-.63l.47-.47a.75.75 0 000-1.06zM13.5 12.5a1 1 0 11-2 0 1 1 0 012 0zm-9 0a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-3.25-2.386V5.886a2.501 2.501 0 111.5 0v4.228A2.501 2.501 0 016 12.5zm-1.5-9a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                
                {
                  showMergedList &&
                  <PullReqList/>
                } */}

                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16"
                  className={`pin-icon ${isPinned ? 'isPinned':'notPinned'} `} 
                  onClick={() => setIsPinned(prev => !prev)} 
                  xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      fill-rule="evenodd" 
                      clip-rule="evenodd" 
                      d="M11.28 1.22a.75.75 0 00-1.26.7L6.69 5.25H4.206c-1.114 0-1.671 1.346-.884 2.134l1.911 1.911-3.72 4.135A2 2 0 001 14.768V15h.233a2 2 0 001.337-.513l4.135-3.721 1.911 1.91c.788.788 2.134.23 2.134-.883V9.31l3.33-3.33a.75.75 0 00.7-1.261l-.603-.604-2.293-2.293-.604-.603zM12.94 5L11 3.06 8.06 6 10 7.94 12.94 5zM6.69 6.75l2.56 2.56v1.88L4.81 6.75h1.88z"
                      />
                </svg>

                <svg 
                  width="16" 
                  height="16" 
                  className={`settings-icon ${showSettings ? 'showSettings':''}`}
                  viewBox="0 0 16 16" 
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setShowSettings(prev => !prev)}
                >
                  <path 
                    d="M6.43 1.168l-.74-.123.74.123zm-.156.939l.74.123-.74-.123zm-.173.2l.237.711-.237-.711zM4.02 3.509l-.498-.56.498.56zm-.26.05l.263-.702-.263.702zm-.893-.334l.263-.703-.263.703zm-.608.218l-.65-.375.65.375zM1.183 5.307l-.65-.375.65.375zm.115.636l.477-.579-.477.58zm.736.606l-.477.579.477-.58zm.086.25l.735.149-.735-.15zm0 2.403l.735-.15-.735.15zm-.086.25l.476.578-.476-.579zm-.736.605l-.476-.58.476.58zm-.115.636l-.65.375.65-.375zm1.077 1.864l.65-.375-.65.375zm.608.218l.263.703-.263-.703zm.893-.334l-.263-.703.263.703zm.26.05l-.498.56.498-.56zm2.08 1.202l.237-.711-.237.711zm.173.2l.74-.123-.74.123zm.156.94l.74-.124-.74.123zm3.14 0l-.74-.124.74.123zm.156-.94l.74.123-.74-.123zm.173-.2l.238.712-.238-.712zm2.08-1.202l-.497-.561.497.56zm.26-.05l.263-.703-.263.703zm.893.334l-.263.703.263-.703zm.609-.218l-.65-.375.65.375zm1.076-1.864l.65.375-.65-.375zm-.115-.636l-.477.579.477-.58zm-.736-.606l-.476.58.476-.58zm-.086-.25l.735.15-.735-.15zm0-2.403l.735-.15-.735.15zm.086-.25l-.476-.578.476.579zm.736-.605l-.477-.579.477.58zm.115-.636l.65-.375-.65.375zM13.74 3.443l-.65.375.65-.375zm-.609-.218l-.263-.703.263.703zm-.893.334l-.263-.702.263.702zm-.26-.05l-.497.561.497-.56zM9.9 2.307l-.237.711.237-.711zm-.173-.2l.74-.123-.74.123zm-.156-.94l-.74.124.74-.123zM6.924 1.5h2.152V0H6.924v1.5zm.246-.209a.25.25 0 01-.246.209V0A1.25 1.25 0 005.69 1.044l1.48.247zm-.156.94l.156-.94-1.48-.246-.156.939 1.48.246zm-.676.787c.343-.114.613-.41.676-.788l-1.48-.246a.494.494 0 01.33-.389l.474 1.423zM4.518 4.07a5.244 5.244 0 011.82-1.052l-.474-1.423a6.744 6.744 0 00-2.34 1.353l.994 1.122zm-1.02.192c.36.134.75.048 1.02-.192l-.995-1.122a.494.494 0 01.501-.091l-.526 1.405zm-.893-.335l.893.335.526-1.405-.893-.335-.526 1.405zm.304-.11a.25.25 0 01-.304.11l.526-1.405a1.25 1.25 0 00-1.521.546l1.3.75zM1.833 5.683l1.076-1.864-1.299-.75L.534 4.932l1.299.75zm-.058-.318a.25.25 0 01.058.318l-1.3-.75a1.25 1.25 0 00.289 1.59l.953-1.158zm.735.606l-.735-.606-.953 1.158.735.606.953-1.158zm.345.978a1.006 1.006 0 00-.345-.978l-.953 1.158a.494.494 0 01-.172-.48l1.47.3zM2.75 8c0-.361.036-.713.105-1.052l-1.47-.3c-.088.438-.135.89-.135 1.352h1.5zm.105 1.052A5.277 5.277 0 012.75 8h-1.5c0 .462.047.914.135 1.351l1.47-.299zm-.345.978c.296-.243.417-.624.345-.978l-1.47.3a.494.494 0 01.172-.48l.953 1.158zm-.735.606l.735-.606-.953-1.158-.735.606.953 1.158zm.058-.318a.25.25 0 01-.058.318L.822 9.478a1.25 1.25 0 00-.288 1.59l1.299-.75zm1.076 1.864l-1.076-1.864-1.3.75 1.077 1.864 1.3-.75zm-.304-.109a.25.25 0 01.304.11l-1.299.75c.306.528.949.76 1.521.545l-.526-1.405zm.893-.335l-.893.335.526 1.405.893-.335-.526-1.405zm1.02.192a1.006 1.006 0 00-1.02-.191l.526 1.404a.494.494 0 01-.5-.091l.994-1.122zm1.82 1.052a5.243 5.243 0 01-1.82-1.052l-.995 1.122a6.745 6.745 0 002.34 1.353l.475-1.423zm.676.788a1.006 1.006 0 00-.676-.788l-.474 1.423a.494.494 0 01-.33-.388l1.48-.247zm.156.939l-.156-.94-1.48.248.157.939 1.48-.247zm-.246-.209a.25.25 0 01.246.209l-1.48.247A1.25 1.25 0 006.925 16v-1.5zm2.152 0H6.924V16h2.152v-1.5zm-.246.209a.25.25 0 01.246-.209V16a1.25 1.25 0 001.233-1.044l-1.48-.247zm.156-.94l-.156.94 1.48.247.156-.94-1.48-.246zm.676-.787c-.343.114-.613.41-.676.788l1.48.246a.494.494 0 01-.33.389l-.474-1.423zm1.82-1.052a5.244 5.244 0 01-1.82 1.052l.474 1.423a6.745 6.745 0 002.34-1.353l-.994-1.122zm1.02-.191a1.006 1.006 0 00-1.02.19l.995 1.123a.494.494 0 01-.501.091l.526-1.405zm.893.334l-.893-.335-.526 1.405.893.335.526-1.405zm-.304.11a.25.25 0 01.304-.11l-.526 1.405a1.25 1.25 0 001.521-.546l-1.299-.75zm1.076-1.865l-1.076 1.864 1.299.75 1.076-1.864-1.299-.75zm.058.318a.25.25 0 01-.058-.318l1.3.75a1.25 1.25 0 00-.289-1.59l-.953 1.158zm-.735-.606l.735.606.953-1.158-.735-.606-.953 1.158zm-.345-.978c-.072.354.049.735.345.978l.953-1.158c.15.123.206.311.172.48l-1.47-.3zM13.25 8c0 .361-.036.713-.105 1.052l1.47.3c.088-.438.135-.89.135-1.352h-1.5zm-.105-1.052c.069.339.105.69.105 1.052h1.5c0-.462-.046-.914-.135-1.351l-1.47.299zm.345-.978a1.007 1.007 0 00-.345.978l1.47-.3a.494.494 0 01-.172.48L13.49 5.97zm.735-.606l-.735.606.953 1.158.735-.606-.953-1.158zm-.058.318a.25.25 0 01.058-.318l.953 1.158a1.25 1.25 0 00.288-1.59l-1.299.75zm-1.076-1.864l1.076 1.864 1.3-.75-1.077-1.864-1.299.75zm.304.109a.25.25 0 01-.304-.11l1.299-.75a1.25 1.25 0 00-1.521-.545l.526 1.405zm-.893.334l.893-.334-.526-1.405-.893.335.526 1.404zm-1.02-.19c.27.24.66.325 1.02.19l-.526-1.404a.494.494 0 01.5.091l-.994 1.122zm-1.82-1.053a5.244 5.244 0 011.82 1.052l.995-1.122a6.744 6.744 0 00-2.34-1.353l-.475 1.423zm-.676-.788c.063.379.333.674.676.788l.474-1.423a.494.494 0 01.33.389l-1.48.246zm-.156-.939l.156.94 1.48-.247-.157-.94-1.48.247zm.246.209a.25.25 0 01-.246-.209l1.48-.246A1.25 1.25 0 009.075 0v1.5zM10.25 8A2.25 2.25 0 018 10.25v1.5A3.75 3.75 0 0011.75 8h-1.5zM8 5.75A2.25 2.25 0 0110.25 8h1.5A3.75 3.75 0 008 4.25v1.5zM5.75 8A2.25 2.25 0 018 5.75v-1.5A3.75 3.75 0 004.25 8h1.5zM8 10.25A2.25 2.25 0 015.75 8h-1.5A3.75 3.75 0 008 11.75v-1.5z"
                  />
                </svg>

                <svg 
                  width="16" 
                  height="16"
                  className={`merge-icon ${showMergedList ? 'showMergedList': ''}`} 
                  onClick={() => setShowMergedList(prev => !prev)}
                  viewBox="0 0 16 16" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fill-rule="evenodd" 
                    clip-rule="evenodd" 
                    d="M10.34 1.22a.75.75 0 00-1.06 0L7.53 2.97 7 3.5l.53.53 1.75 1.75a.75.75 0 101.06-1.06l-.47-.47h.63c.69 0 1.25.56 1.25 1.25v4.614a2.501 2.501 0 101.5 0V5.5a2.75 2.75 0 00-2.75-2.75h-.63l.47-.47a.75.75 0 000-1.06zM13.5 12.5a1 1 0 11-2 0 1 1 0 012 0zm-9 0a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-3.25-2.386V5.886a2.501 2.501 0 111.5 0v4.228A2.501 2.501 0 016 12.5zm-1.5-9a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                
                {
                  showMergedList &&
                  <PullReqList/>
                }

                {/* <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16"
                  className={`pin-icon ${isPinned ? 'isPinned':'notPinned'} `} 
                  onClick={() => setIsPinned(prev => !prev)} 
                  xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      fill-rule="evenodd" 
                      clip-rule="evenodd" 
                      d="M11.28 1.22a.75.75 0 00-1.26.7L6.69 5.25H4.206c-1.114 0-1.671 1.346-.884 2.134l1.911 1.911-3.72 4.135A2 2 0 001 14.768V15h.233a2 2 0 001.337-.513l4.135-3.721 1.911 1.91c.788.788 2.134.23 2.134-.883V9.31l3.33-3.33a.75.75 0 00.7-1.261l-.603-.604-2.293-2.293-.604-.603zM12.94 5L11 3.06 8.06 6 10 7.94 12.94 5zM6.69 6.75l2.56 2.56v1.88L4.81 6.75h1.88z"
                      />
                </svg> */}

                <svg 
                 width="16" 
                 height="16" 
                 viewBox="0 0 16 16" 
                 className={`summary-icon ${showSummary ? 'showSummary': ''} `}
                 onClick={() => setShowSummary(prev => !prev)}
                 xmlns="http://www.w3.org/2000/svg"
                 >
                  <path 
                    fill-rule="evenodd" 
                    clip-rule="evenodd" 
                    d="M12.5 6v8.5h-9v-13H8v2.75C8 5.216 8.784 6 9.75 6h2.75zm-.121-1.5L9.5 1.621V4.25c0 .138.112.25.25.25h2.629zM2 1a1 1 0 011-1h6.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V15a1 1 0 01-1 1H3a1 1 0 01-1-1V1zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 11.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z"
                  />
                </svg>

                
             </div>
            </>
        }
        </div>
        )}

export default Header
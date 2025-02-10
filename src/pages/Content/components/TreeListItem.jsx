import React, { useEffect, useState, useContext, useLayoutEffect, useRef, useCallback } from 'react';
import folderIcon from '../../../assets/img/sprite_icons/folder.svg'
import chevronRightIcon from '../../../assets/img/sprite_icons/chevron-right.svg'
import {GlobalContext} from '../context/GlobalState';
import { getSubDirectory, itemActive, onItemClick} from '../../../../utils/helpers';
import {getIconForFile} from '@gitlab/svgs'
import { SettingsContext } from '../context/SettingsState';
import {getIconForFilePath, getIconUrlByName, getIconInfo, isMaterialIconName} from 'vscode-material-icons';


const TreeListItem = ({tree, index}) => {
    
    const{searchValue, isAllExpanded, branch} = useContext(GlobalContext);
    const{setting} = useContext(SettingsContext);
    const[isExpanded, setIsExpanded] = useState(false);
    const[subDirectory, setSubDirectory] = useState([]);
  


    const subRepositoryTree = useCallback(async (signal) => {
      await chrome.storage.local.get('projectId', (res) => {
        if(Object.values(res).length > 0 && Object.values(tree).length > 0){
            getSubDirectory(res.projectId, branch, tree.path, undefined, signal).then(result => setSubDirectory(result));
        }
      })
    }, [tree.path, branch]);

 
    
    
    

        useEffect(() => {

            const abortController = new AbortController();
            const signal = abortController.signal;

            if(tree.type == 'tree'){

              subRepositoryTree(signal);
            }

          
        
            return () => {
                abortController.abort();
            }
        }, [tree, branch]);

      return(
       <div className='treeListItemWrapper' key={index}>
  
       <li className='treeListItem' 
           onClick={tree.type == 'tree' ? () =>  setIsExpanded(prev => !prev) : (e) => onItemClick(e, tree.path, undefined ,tree.type)}
           style={{ backgroundColor: `${ tree.type == 'blob' && itemActive(tree.path) ? 'rgb(179, 227, 255)': ''}` }}>
        {
          tree.type == 'tree'
           ?
          <img 
           src={chrome.runtime.getURL(setting.iconSelect == 'gitlab' ? folderIcon : require(`../../../assets/img/vs_code_icons/${getIconForFilePath(tree.name)}.svg`))}
           alt="folder icon"
           width={17}
           height={17}/>
           : 
           getIconForFile.getIconForFile(tree.name).length > 0
           ||
           setting.iconSelect == 'vscode'
             ?
          
           <img 
           src={chrome.runtime.getURL(
            setting.iconSelect == 'gitlab'?
            require(`../../../assets/img/file_icons/${getIconForFile.getIconForFile(tree.name)}.svg`)
            :
            require(`../../../assets/img/vs_code_icons/${getIconForFilePath(tree.name)}.svg`)

          )}
           alt="file icon"
           width={17}
           height={17}/>
           :
           <svg 
             width="16" 
             height="16" 
             viewBox="0 0 16 16" 
             xmlns="http://www.w3.org/2000/svg"
             style={{fill: 'currentcolor', color: 'rgb(59 130 246)'}}
             >
              <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M12.5 6v8.5h-9v-13H8v2.75C8 5.216 8.784 6 9.75 6h2.75zm-.121-1.5L9.5 1.621V4.25c0 .138.112.25.25.25h2.629zM2 1a1 1 0 011-1h6.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V15a1 1 0 01-1 1H3a1 1 0 01-1-1V1z"
              />
            </svg>
     
         }
            <span title={tree.name} className='itemText'>  
            {tree.name}
            </span>

        {
         tree.type == 'tree'
           &&  
        <img 
         alt="expand icon"
         src={chrome.runtime.getURL(chevronRightIcon)} 
         className={`expand-icon ${isExpanded ||   itemActive(tree.path, tree.type) || isAllExpanded ? 'isExpanded' : ''}`}
         width={15} 
         height={15} /> 
        }
      
        </li>
        {
           <div style={{ paddingLeft: '0.4rem' }} className = {`subDirListContainer ${isExpanded ||  itemActive(tree.path, tree.type) || isAllExpanded  ? 'notCollapsed': 'isCollapsed'}`}>
            {
                tree.type == 'tree' && subDirectory.length > 0 &&  subDirectory.map((subDir, index) => (
               <TreeListItem tree={subDir} index={index}/>))
            }
           </div>
        }
        </div>
  )
}

export default TreeListItem
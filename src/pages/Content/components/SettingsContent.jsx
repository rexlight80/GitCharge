import React, { useContext, useRef } from 'react'
import { SettingsContext } from '../context/SettingsState';
import FontPicker from 'font-picker-react';
import {GOOGLE_FONT_API_KEY} from '../../../../utils/env';
import AccessTokenInput from './AccessTokenInput';
import { GlobalContext } from '../context/GlobalState';
import mellowtelIcon from '../../../assets/img/mellowtel_icon.png';

const SettingsContent = () => {

    const{setting, setShowSettings, fontFamily, setFontFamily} = useContext(SettingsContext);
    const {userDetail} = useContext(GlobalContext);
    const accessTokenRef = useRef(null);
    const showSidebarRef = useRef(null);
    const hotKeysRef = useRef(null);
    const  showInSelectRef = useRef(null);
    const  fontSizeSelectRef = useRef(null);
    const iconSelectRef = useRef(null);

      const onSubmit = () => {
        if(accessTokenRef.current.value.length > 0 || showSidebarRef.current.checked || hotKeysRef.current.value.length > 0 || showInSelectRef.current.value.length > 0 || fontFamily.length > 0 || fontSizeSelectRef.current.value.length > 0){

        chrome.storage.local.set({
            settings:{
                accessToken: accessTokenRef.current.value, 
                sideBarHover: showSidebarRef.current.checked,
                hotKeys: hotKeysRef.current.value.toLowerCase(),
                showInSelect: showInSelectRef.current.value,
                fontFamily: fontFamily,
                fontSizeSelect: fontSizeSelectRef.current.value,
                iconSelect: iconSelectRef.current.value
            }
        }).then(() => {
          setShowSettings(false)
        })

        
    }}
    

    const onLogin = (e) => {
       e.preventDefault();
       chrome.runtime.sendMessage({'launch':'login'}, (res) => console.log('res', res.response));
    }
   

  return (
    <form className='settingsContentWrapper'>
     <div className='authSection'>
    <span>Authentication</span>
    {
        !(Object.values(userDetail).length > 0)
        &&
     <button 
       className='loginBtn'
       onClick={(e) => onLogin(e)}>

     <svg 
       xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 24 24" 
       id="gitlab"
    >
        <path 
          fill="#E24329" 
          d="m12 23.054 4.419-13.6H7.581L12 23.054z"></path><path fill="#FC6D26" d="m12 23.054-4.419-13.6H1.388L12 23.054z"></path><path fill="#FCA326" d="M1.388 9.453.045 13.586a.917.917 0 0 0 .332 1.023L12 23.054 1.388 9.453z"></path><path fill="#E24329" d="M1.388 9.454h6.193L4.919 1.262a.457.457 0 0 0-.87 0L1.388 9.454z"></path><path fill="#FC6D26" d="m12 23.054 4.419-13.6h6.193L12 23.054z"></path><path fill="#FCA326" d="m22.612 9.453 1.343 4.133a.917.917 0 0 1-.332 1.023L12 23.054 22.612 9.453z"></path><path fill="#E24329" d="M22.612 9.454h-6.193l2.662-8.191a.457.457 0 0 1 .87 0l2.661 8.191z">
        </path>
    </svg>
    <span>Login with Gitlab</span>
     </button>
    }
     <AccessTokenInput ref={accessTokenRef}/>
     </div>
     <div className='displaySection'>
           <span>Display</span>
        <label className='sidebarCheck'><input defaultChecked={setting.sideBarHover} ref={showSidebarRef} type='checkbox' name='showSidebar'/> Show sidebar on hover</label>
        <label className='hotKeys'>Hotkeys <input defaultValue={setting.hotKeys} ref={hotKeysRef} type='text'  name='hot_keys'/></label>
        <label className='showInSelect'>Show in
            <select ref={showInSelectRef} defaultValue={setting.showInSelect}>
            <option value="CodeAndPullRequest">Code &amp; pulls</option>
            <option value="Code">Code</option>
            <option value="PullRequest">Pull Requests</option>
            <option value="All">All Pages</option>
            </select>
        </label>

        <label className='iconSelect'>Icons
            <select ref={iconSelectRef} defaultValue={setting.iconSelect}>
            <option value="gitlab">Gitlab</option>
            <option value="vscode">VSCode</option>
         
            </select>
        </label>


     </div>
     <div className='codeFontsSection'>
      <span>Code Font</span>
      <label className='codeFontSelect'>Name
            <FontPicker
                onChange={(nextFont) => setFontFamily(nextFont.family)}
                apiKey={GOOGLE_FONT_API_KEY}
                activeFontFamily={fontFamily}
            />
        </label>
        <label className='codeSizeSelect'>Size
          <select ref={fontSizeSelectRef} defaultValue={setting.fontSizeSelect}>
            <option value="8px">8px</option>
            <option value="12px">12px</option>
            <option value="16px">16px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
          </select>
        </label>
       
     </div>
     <div className='mellowtelInfo'>
         <span>
         Click this <div className='mellowtelIconContainer' style={{display: 'inline-block', opacity: 1 }} title='Mellowtel Setting'> 
           <img
             src={chrome.runtime.getURL(mellowtelIcon)}
             alt='Opt-In'
             style={{width: '100%', height: '100%'}}
            />
        </div> icon found below to generate a mellowtel settings popup where you can decide at any time if you want to opt-in or opt-out. For more info
        click <a target='_blank' style={{textDecoration: 'none', color: 'lightblue'}} href='https://www.mellowtel.com/mellowtel-user-guide/'>here</a>
         </span>
     </div>
     <button type='button' className='btnSubmit'  onClick={onSubmit}>
          Apply Settings
      </button>
    </form>
  )
}

export default SettingsContent
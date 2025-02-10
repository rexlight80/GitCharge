import React, { useContext } from 'react'
import mellowtelIcon from '../../../assets/img/mellowtel_icon.png'
import { MELLOWTEL_PUBLIC_KEY } from '../../../../utils/env'
import Mellowtel from 'mellowtel';
import logOutIcon from '../../../assets/img/log_out.svg'
import { GlobalContext } from '../context/GlobalState';
import { myHeaders, signOut } from '../../../../utils/gitLabApi';


const mellowtel = new Mellowtel(MELLOWTEL_PUBLIC_KEY);

const onOptIn = async (e) => {
    e.preventDefault();
    await mellowtel.openUserSettingsInPopupWindow();
}


const Footer = () => {
    const {userDetail, setUserDetail} = useContext(GlobalContext);
    
    const onLogOut = (e) => {
    e.preventDefault();
    chrome.storage.local.get('accessToken',  (res) => {
      if(res.accessToken.access_token.length > 0){
        myHeaders.delete('Authorization');
        signOut(res.accessToken.access_token).then(data => {
          chrome.storage.local.remove('userDetail');
          chrome.storage.local.remove('accessToken');
           setUserDetail({});

             })
        
      }
    })
  }
    
  return (
    <div className='footerContainer'>
        {
            Object.values(userDetail).length > 0
            &&
           <span title={`Logged as ${userDetail.username}`}>Logged as {userDetail.username}</span>
        }
        <div className='footerIcons'>
        <div className='mellowtelIconContainer' onClick={(e) => onOptIn(e)} title='Mellowtel Setting'>
            {/* <Tooltip arrowPosition='left' content='Mellowtel Settings'/> */}
           <img
             src={chrome.runtime.getURL(mellowtelIcon)}
             alt='Opt-In'
             style={{width: '100%', height: '100%'}}
            />
        </div>
        <img
          src={chrome.runtime.getURL(logOutIcon)}
          onClick={(e) => onLogOut(e)}
          alt='Log-Out'
          title='Log-Out'
          className='logOutIcon'
        />
        </div>
    </div>
  )
}

export default Footer
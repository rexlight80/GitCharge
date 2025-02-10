import React, { useState, forwardRef } from 'react';
import Tooltip from './Tooltip';

const AccessTokenInput = forwardRef((props, ref) => {

    const [showTooltip, setShowTooltip] = useState(false);
    const urlAccessToken = 'https://gitlab.com/-/user_settings/personal_access_tokens';

  return (
    <div className='accessTokenInputWrapper'>
    <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    xmlns="http://www.w3.org/2000/svg"
    className='key-icon'
    onMouseEnter={() => setShowTooltip(prev => !prev)}
    onMouseLeave={() => setShowTooltip(prev => !prev)}
    onClick={() => window.open(urlAccessToken, '_blank').focus()}
    >
    <path 
      fill-rule="evenodd" 
      clip-rule="evenodd" 
      d="M6.358 8.763l.675-.674-.325-.897A3.5 3.5 0 1110 9.5H7.5v1H6.379l-.44.44-1 1-.439.439V13.5h-2v-.879l3.858-3.858zM6 15v-2l1-1h2v-1h1a5 5 0 10-4.703-3.297L1 12v3h5zm5-9a1 1 0 100-2 1 1 0 000 2z"
    />
    </svg>
   {showTooltip && <Tooltip arrowPosition='left' content='Generate new token'/>}      

<input type='text' ref={ref} name='accessToken'  placeholder='Or enter access token'/>
</div>
  )
});

export default AccessTokenInput;
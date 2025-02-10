import React from 'react'

const Tooltip = ({ content, arrowPosition}) => (

    <div className='toolTipWrapper' style={arrowPosition == 'left' ? {top:'-2%', left:'-50%'}:{bottom:'-2rem'}}>
        <div className='toolTipBody'>
            <div className='toolTipArrow' 
            style ={arrowPosition == 'left' ? { top:'38%', left:'-0.19rem', transform: 'rotate(-50deg)' }: {top:'-0.19rem', left:'50%', transform: 'rotate(45deg)'}}> 
            </div>
        <span className='toolTipText'> {content} </span>

        </div>

    </div>
  );

export default Tooltip;
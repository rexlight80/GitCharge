import React from 'react'

const RequestSelectorList = ({setIsOpened, setState}) => {

    const states = ['all', 'opened', 'closed', 'merged']
  return (
    <div className='requestSelectorList'>
        {
            states.map((state, index) => (
                <div 
                className='requestSelectorListItem' 
                key={index} 
                onClick={() => {
                    setState(state);
                    setIsOpened(prev => !prev);
                }}
                ><span>
                    {state}
                 </span>
                </div>
            ))
        }

    </div>
  )
}

export default RequestSelectorList
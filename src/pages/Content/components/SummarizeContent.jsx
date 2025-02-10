import React, { useEffect, useRef,useState } from 'react'
import copyClipBoard from '../../../assets/img/sprite_icons/copy-to-clipboard.svg'
import chevronDown from '../../../assets/img/sprite_icons/chevron-lg-down.svg'
import loader from '../../../assets/img/loading.gif';
import { getSummarizedText } from '../../../../utils/gitLabApi';
import { ToastContainer, toast } from 'react-toastify';

const SummarizeContent = () => {

    const codeTextAreaRef = useRef(null);
    const summarizedTextAreaRef = useRef(null);
    const [loading, setLoading] = useState(false);

  
    const parseCodeToTextArea = (e) => {
        e.preventDefault();
        let codes =[];

            if(document.querySelector('code[data-testid = content]') !== null){
                document.querySelectorAll('code[data-testid = content]').forEach(code => {
                    codes.push(code.innerText);
                });
                if(codes.length > 0){
                    codeTextAreaRef.current.value = codes;   
                }
            }else if(document.querySelector('code[data-blob-hash]') !== null){
                document.querySelectorAll('code[data-blob-hash]').forEach(code => {
                    codes.push(code.innerText);
                })
                if(codes.length > 0){
                    codeTextAreaRef.current.value = codes;   
                }
            }else{
                toast.error('Could not detect code!!', {
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
    }

    const summarizeCode = async (e,text) => {
        e.preventDefault();
        if(text.length > 0){
            setLoading(true);
            const result = await getSummarizedText(text);
            summarizedTextAreaRef.current.value = result;
            setLoading(false);
        }
    }

  return (
    <div className='summarizeContentWrapper'>
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
        
       <textarea className='textArea' name="code" ref={codeTextAreaRef} rows={15} placeholder='Enter code here'></textarea>
        <div className='rowBtn'>
            <button className='copyBtn' onClick={(e) => parseCodeToTextArea(e)}>
            <img 
              alt="copy icon"
              className='copy-icon'
              style={{'marginRight': '0.4rem'}}
              width={12} 
              height={12} 
              src={chrome.runtime.getURL(copyClipBoard)} 
            /> 
               <span>Scan code</span> 
            </button>
            {
                loading ?
                <img 
                alt="loader" 
                width={15} 
                height={15} 
                src={chrome.runtime.getURL(loader)} 
                /> :
                <img src={chrome.runtime.getURL(chevronDown)} alt='chevron_arrow_down'/>
            }
            <button className='summarizeBtn' onClick={e => summarizeCode(e, codeTextAreaRef.current.value)}>
                <span>Summarize</span>
            </button>
        </div>
            <textarea className={`textArea ${loading ? 'summarized': ''}`} name="summarizedCode" disabled ref={summarizedTextAreaRef} rows={25}></textarea>
    </div>
  )
}

export default SummarizeContent;
import React,{useEffect} from 'react'
import Prism from 'prismjs';
import Markdown from 'markdown-to-jsx';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import '../../styles/prismdracula.css';
const AiResponse = (props) => {
    useEffect(()=>{
        
        Prism.highlightAll();
    },[])
  return (
    <Markdown>
        {props.children}
    </Markdown>
  )
}

export default AiResponse;
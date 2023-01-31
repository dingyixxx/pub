import React,{useEffect} from 'react'
import { Button } from 'antd';
import axios from 'axios'
export default function Home() {
    // useEffect(() => {
    //     axios.get('http://127.0.0.1:5000/posts?_embed=comments').then(res=>console.log(res.data))
    //     axios.get('http://127.0.0.1:5000/comments?_expand=post').then(res=>console.log(res.data))
    // }, [])
    
  return (
    <div>
        <button onClick={()=>{
            
        }}>点我发送请求</button>
    </div>
  )
}

import React from 'react'
import './Login.module.scss'
export default function Login() {
  return (
    <div>
      <button onClick={()=>{
        localStorage.setItem('token',123)
      }}>Login</button>
    </div>
  )
}

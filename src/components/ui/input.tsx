import React from 'react'







export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} className={`px-3 py-2 border rounded ${props.className}`} />
}







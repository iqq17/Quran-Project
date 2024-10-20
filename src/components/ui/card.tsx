import React from 'react'







export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div {...props} className={`bg-white rounded-lg shadow ${props.className}`}>{children}</div>
}

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div {...props} className={`p-4 ${props.className}`}>{children}</div>
}









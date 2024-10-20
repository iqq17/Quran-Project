import React from 'react'



interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  variant?: 'default' | 'outline'

}



export const Button: React.FC<ButtonProps> = ({ variant = 'default', className = '', ...props }) => {

  const baseStyles = 'px-4 py-2 rounded transition-colors duration-300'

  const variantStyles = variant === 'outline' 

    ? 'border border-current hover:bg-current hover:text-white' 

    : 'bg-[#365b6d] text-white hover:bg-[#2a4a5a]'



  return <button {...props} className={`${baseStyles} ${variantStyles} ${className}`} />

}




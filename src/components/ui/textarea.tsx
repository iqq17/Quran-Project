import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <textarea
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#365b6d]"
      {...props}
    />
  );
};

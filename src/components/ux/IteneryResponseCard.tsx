import React from 'react'
import ReactMarkdown from "react-markdown";
interface IteneryResponseCardProps {
    message:string;
    
}

const IteneryResponseCard = ({message}:IteneryResponseCardProps) => {
  return (
    <div>
    <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  )
}

export default IteneryResponseCard

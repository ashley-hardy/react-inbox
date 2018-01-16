import React from 'react'
import Message from './Message'

const MessagesList = ({messages, toggleClass, persist}) => {
  return (
    <div>
      {messages.map(message => (<Message key={message.id} message={message} toggleClass= {toggleClass} persist={persist}/>))}
    </div>
  )
}

export default MessagesList

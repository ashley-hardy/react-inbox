import React from 'react'

const Message = ({message, toggleClass, markRead, persist}) => {

const checkReadClass = (message => {
  if(message.read) {
    return 'read'
  } else {
    return 'unread'
  }
})

const readClass = checkReadClass(message)
const selectedClass = message.selected ? 'selected' : ''
const checked = message.selected ? 'checked' : ''
const starredClass = message.starred ? '' : '-o'

  return (
    <div className={`row message ${readClass} ${selectedClass}`} onClick={(event)=>{
      const body = {
        'messageIds': [message.id],
        'command': 'read',
        'read': !message.read
      }
      persist(body, 'PATCH')
      toggleClass(event, message, "read")}}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2" onClick={(event)=>{
            const body = {
              'messageIds': [message.id],
              'command': 'read',
              'read': !message.read
            }
            persist(body, 'PATCH')
            toggleClass(event, message, 'selected')}}>
            <input type="checkbox" checked={`${checked}`}/>
          </div>
          <div className="col-xs-2" onClick={(event)=> {
            const body = {
              'messageIds': [message.id],
              'command': 'star',
              'star': !message.starred
            }
            persist(body, 'PATCH')
            toggleClass(event, message, 'starred')}}>
            <i className={`star fa fa-star${starredClass}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {message.labels.map(ele => {
          return <span className='label label-warning'>{ele}</span>
        })}
        <a>
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message

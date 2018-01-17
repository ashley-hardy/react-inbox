import React from 'react'
let style = 'none'

const Message = ({message, toggleClass, markRead, persist, pathId}) => {

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

pathId = () => {
  if (style === 'none') {
    style = 'block'
  } else {
    style = 'none'
  }
}

  return (
    <div>
      <div className={`row message ${readClass} ${selectedClass}`} onClick={(event)=>{
        const body = {
          'messageIds': [message.id],
          'command': 'read',
          'read': !message.read
        }
        pathId()
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
      <div className="row message-body" style={{display:`${style}`}}>
        <div className="col-xs-11 col-xs-offset-1">
          This is the body of the message.
        </div>
      </div>
    </div>
  )
}

export default Message

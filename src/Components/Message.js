import React from 'react'

const Message = ({message, toggleClass}) => {

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
    <div className={`row message ${readClass} ${selectedClass}`} onClick={()=>{toggleClass(message)}}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2" onClick={()=>{toggleClass(message, 'selected')}}>
            <input type="checkbox" checked={`${checked}`}/>
          </div>
          <div className="col-xs-2" onClick={()=>toggleClass(message, 'starred')}>
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

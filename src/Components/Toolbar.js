import React from 'react'

const Toolbar = ({messages, message, selectAll, markRead, markUnread, deleteMessage, addLabel, removeLabel, updateRead}) => {

  const checkedClass = () => {
    for(var i = 0; i < messages.length; i++) {
      if(messages[i].selected) {
        return 'fa-check-square-o'
      } else {
        return 'fa-square-o'
      }
    }
  }

  const checkClass = checkedClass(messages)

  updateRead = () => {
    let messagesArr = messages.filter(ele => ele.read)
    return messagesArr.length
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{`${updateRead()}`}</span>
          unread messages
        </p>

        <a className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </a>

        <button className="btn btn-default" onClick={()=> {selectAll(messages)}}>
          <i className={`fa ${checkClass}`}></i>
        </button>

        <button className="btn btn-default" onClick={()=> {markRead(messages)}}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={()=> {markUnread(messages)}}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange={(e)=> {addLabel(e.target.value)}}>
          <option selected="true" disabled>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={(e)=> {removeLabel(e.target.value)}}>
          <option selected="true" disabled>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={()=> {deleteMessage(messages)}}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar

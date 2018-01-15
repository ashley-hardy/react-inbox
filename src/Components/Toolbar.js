import React from 'react'
import Compose from './Compose'

const Toolbar = ({messages, message, selectAll, markRead, markUnread, deleteMessage, addLabel, removeLabel, updateRead, addS, composeMessage, persist, findLabels, remove, trash}) => {

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
    let messagesArr = messages.filter(ele => !ele.read)
    return messagesArr.length
  }

  addS = () => {
    let messagesArr = messages.filter(ele => !ele.read)
    if (messagesArr.length === 1) {
      return `unread message`
    } else {
      return `unread messages`
    }
  }

  findLabels = (messages, event) => {
     const body = {
      'messageIds': [],
      'command': 'addLabel',
      'label': ''
    }
    messages.map(message => {
      if(message.selected) {
        body.messageIds.push(message.id)
        body.label = event.target.value
      }
    })
    persist(body, 'PATCH')
    addLabel(event.target.value)
  }

  remove = (messages, event) => {
    const body = {
      'messageIds': [],
      'command': 'removeLabel',
      'label': ''
    }
    const newMessages = messages.map(message => {
      if(message.selected) {
        body.messageIds.push(message.id)
        body.label = event.target.value
      }
    })
    persist(body, 'PATCH')
    removeLabel(event.target.value)
  }

  trash = (messages) => {
    const body = {
      'messageIds': [],
      'command': 'delete',
    }
    messages.map(message => {
      if(message.selected) {
        body.messageIds.push(message.id)
      }
    })
    persist(body, 'PATCH')
    deleteMessage(messages)
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{`${updateRead()}`}</span>
          {`${addS()}`}
        </p>

        <a className="btn btn-danger" onClick={()=> {composeMessage()}}>
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

        <select className="form-control label-select" onChange={(event)=> {findLabels(messages, event)}}>
          <option selected="true" disabled>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={(event)=> {remove(messages, event)}}>
          <option selected="true" disabled>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={()=> {trash(messages)}}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar

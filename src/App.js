import React, { Component } from 'react';
import './App.css';
import MessagesList from './Components/MessagesList'
import Toolbar from './Components/Toolbar'
import Compose from './Components/Compose'
let clickOnce = true

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages:[],
      visibility: 'none',
      subjectContent: '',
      bodyContent: ''
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({messages:json._embedded.messages})
  }

  async persist(body, method) {
    await fetch ('http://localhost:8082/api/messages', {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }

  toggleClass = (event, message, objectKey) => {
    event.stopPropagation()
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index][objectKey] = !newMessages[index][objectKey]
    this.setState({messages:newMessages})
  }

  selectAll = (messages) => {
    var messageArr = messages.filter(message => message.selected)
    let newMessages = this.state.messages.slice(0)

    return newMessages.forEach(ele => {
      if (messageArr.length < newMessages.length) {
        ele.selected = true
        return this.setState({messages:newMessages})
      } else {
        ele.selected = false
        return this.setState({messages:newMessages})
      }
    })
  }

  markRead = (messages) => {
    let newMessages = this.state.messages.slice(0)
    return newMessages.forEach(ele => {
      if(ele.selected) {
       ele.read = true
       return this.setState({messages:newMessages})
      }
    })
  }

  markUnread = (messages) => {
    let newMessages = this.state.messages.slice(0)
    return newMessages.forEach(ele => {
      if(ele.selected) {
       ele.read = false
       return this.setState({messages:newMessages})
      }
    })
  }

  deleteMessage = (message) => {
    let newMessages = this.state.messages.slice(0)
    const messagesArr = newMessages.filter(ele => {
      if(ele.selected !== true) {
        return ele
      }
    })
    return this.setState({messages:messagesArr})
  }

  addLabel = (e) => {
    let newMessages = this.state.messages.slice(0)
    return newMessages.forEach(ele => {
      if(ele.selected && ele.labels.indexOf(e) === -1) {
        ele.labels[ele.labels.length] = e
        return this.setState({messages:newMessages})
      }
    })
  }

  removeLabel = (e) => {
    let newMessages = this.state.messages.slice(0)
    return newMessages.forEach(ele => {
      if(ele.selected) {
        let index = ele.labels.indexOf(e)
        ele.labels.splice(index, 1)
        return this.setState({messages:newMessages})
      }
    })
  }

  composeMessage = () => {
    if(clickOnce === true) {
      this.setState({visibility:'block'})
      clickOnce = false
    } else {
      this.setState({visibility:'none'})
      clickOnce = true
    }
   }

  grabSubject = (event) => {
    let subjectContent = event.target.value
    this.setState({subjectContent: subjectContent})
  }

  grabBody = (event) => {
    let bodyContent = event.target.value
    this.setState({bodyContent: bodyContent})
  }

  render() {
    return (
      <div className="App">
        <div className="navbar navbar-default" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">Inbox Styleguide</a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="/">Components</a></li>
                <li><a href="/example">Example</a></li>
                <li><a href="/css">CSS</a></li>
                  <li><a href="/seeds">Seeds</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='container'>
          <Toolbar messages={this.state.messages} selectAll={this.selectAll} markRead={this.markRead} markUnread={this.markUnread} deleteMessage={this.deleteMessage} addLabel={this.addLabel} removeLabel={this.removeLabel} updateRead={this.updateRead} persist={this.persist} composeMessage={this.composeMessage}/>
          <Compose visibility={this.state.visibility} persist={this.persist} grabSubject={this.grabSubject} grabBody={this.grabBody} subjectContent={this.state.subjectContent} bodyContent={this.state.bodyContent}/>
          <MessagesList messages={this.state.messages} toggleClass= {this.toggleClass} persist={this.persist}/>
        </div>
      </div>
    )
  }
}

export default App;

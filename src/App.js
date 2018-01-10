import React, { Component } from 'react';
import './App.css';
import MessagesList from './Components/MessagesList'
import Toolbar from './Components/Toolbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }

  toggleClass = (message, objectKey) => {
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index][objectKey] = !newMessages[index][objectKey]
    this.setState({messages:newMessages})
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
          <Toolbar />
          <MessagesList messages={this.state.messages} toggleClass= {this.toggleClass}/>
        </div>
      </div>

    )
  }
}

export default App;

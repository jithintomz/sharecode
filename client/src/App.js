import React, {
  Component
} from 'react';
import './App.css';
import AceEditor from 'react-ace'
import brace from 'brace';
import io from 'socket.io-client'

import 'brace/mode/javascript';

import 'brace/theme/monokai';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codeText: 'function hello (){}'
    }
  }

  componentDidMount() {
    const server = `http://${window.location.hostname}:5000`
    console.log(server)
    this.socket = io(server);
    this.socket.on('this', (data) => {
      console.log(data)
    })
    this.socket.on('valueChanged', (data) => {
      this.setState({
        ...this.state,
        codeText: data.newValue
      })
    })
  }


  handleChange = (newValue) => {
    this.socket.emit('valueChange', {
      'newValue': newValue
    })
  }


  render() {
    return (
      <AceEditor
    mode="javascript"
    theme="monokai"
    value ={this.state.codeText}
    onChange={this.handleChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{$blockScrolling: true}}
  />
    );
  }
}

export default App;

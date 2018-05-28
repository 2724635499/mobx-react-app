import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import '../App.css'

@inject(store => store)
@observer
class Home extends Component {
  render() {
    console.log(this.props.store)
    return <div className="App">Home</div>
  }
}

export default Home

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject(store => store)
@observer
class Home extends Component {
  render() {
    console.log(this.props.store)
    return <div>Home</div>
  }
}

export default Home

import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import routers from './routers'
// import { inject, observer } from "mobx-react";

// @inject(store => store)
// @observer
class App extends Component {
  render() {
    // console.log(this.props.store)
    return (
      <Router>
        <Switch>
          {routers.map((r, key) => (
            <Route
              component={r.component}
              exact={!!r.exact}
              key={key}
              path={r.path}
            />
          ))}
        </Switch>
      </Router>
    )
  }
}

export default App

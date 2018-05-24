import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import routers from './routers'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routers.map(r => (
            <Route
              key={r.path}
              component={r.component}
              exact={!!r.exact}
              path={r.path}
            />
          ))}
        </Switch>
      </Router>
    )
  }
}

export default App

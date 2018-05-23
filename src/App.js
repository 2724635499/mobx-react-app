import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import routers from './routers'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch> 
          {
            routers.map((r, key) => (
                <Route component={r.component}
                       exact={!!r.exact}
                       key={key}
                       path={r.path}
                />
            ))
          }
        </Switch>
      </Router>
      
    );
  }
}

export default App;

 
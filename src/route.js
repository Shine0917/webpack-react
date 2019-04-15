import React from 'react';
import {createBrowserHistory} from 'history';

export default class  Route extends React.Component{

render() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact render={component={TodoList} }/>
        <Route path="/result" exact component={Result} />
      </Switch>
    </Router>
  )
}
}
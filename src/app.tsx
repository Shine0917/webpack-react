import React from 'react';
import {createBrowserHistory} from 'history';
import { Router, Route, Switch,Redirect } from "react-router-dom";
import TodoList from './pages/TodoList/index'
import Result from './pages/Result/index'
import todoList from './pages/stores/index';
// import todoStore from './pages/stores/index'
export default class  App extends React.Component{

render() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/todo"/>
        )}/>
        <Route path="/todo" exact component={() => <TodoList list={todoList} />} />
        <Route path="/result" exact component={Result} />
      </Switch>
    </Router>
  )
}
}
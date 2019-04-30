import React from 'react';
import {createBrowserHistory} from 'history';
import { Router, Route, Switch,Redirect } from "react-router-dom";
import TodoList from './pages/TodoList/index.tsx';
import Result from './pages/Result/index.tsx';
import todoList from './stores/index';
import TodoListC from './pages/TodoList/index.js';
import ResultC from './pages/Result/index.js';

export default class  App extends React.Component{

render() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/hooks-todo"/>
        )}/>
        <Route path="/hooks-todo" exact component={() => <TodoList list={todoList} /> } />
        <Route path="/hooks-result" exact component={Result} />
        <Route path="/todo" exact component={() => <TodoListC list={todoList} />} />
        <Route path="/result" exact component={ResultC} />

      </Switch>
    </Router>
  )
}
}
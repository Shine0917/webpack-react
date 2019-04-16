import React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import todoStore from './stores/todo'
import App from './app'
import ToDoContext from './stores/index'

let store = {todoStore};
ReactDOM.render(
  <Provider todoStore={todoStore}>
    <ToDoContext.Provider value={todoStore}>
      <App />
    </ToDoContext.Provider>
  </Provider>,
  document.getElementById('root')
)
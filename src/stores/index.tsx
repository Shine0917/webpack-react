import React, {createContext} from 'react';
import todoStore from './todo';

const ToDoContext = createContext(todoStore);

export default ToDoContext;
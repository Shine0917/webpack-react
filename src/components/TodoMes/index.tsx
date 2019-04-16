import React from 'react';
import {Alert} from 'antd';

interface ITodoMes {
  hasDone: number;
  notDone: number;
}

const TodoMes = ({hasDone, notDone}:ITodoMes) => {
return (
  <div>
     <Alert message={`${hasDone} 个计划已完成`} type="success" />
      <Alert message={`${notDone} 个计划未完成`} type="warning" />
      <Alert message={`完成度: ${hasDone} / ${notDone + hasDone}`} type="info" />
  </div>
)
}

export default TodoMes;
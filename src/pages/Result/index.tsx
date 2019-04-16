import React,{useContext} from 'react';
import todoStore from '../../stores/index';
import style from './index.module.less';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import ToDoContext from "../../stores/index";

const Result = () => {
  const store = useContext(ToDoContext);
  const {hasDone} = store;

  return (
    <div className={style.result}>
 
      <h3 className={style.info}>
       完成计划数为:{" "}
        <span className={style.alreadyDone}>{hasDone}</span>
      </h3>
      <Link to="/todo">
        <Button type="primary">返回todoList</Button>
      </Link>
        </div>
  )
}

export default Result;
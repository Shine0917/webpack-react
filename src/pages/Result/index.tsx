import React,{useContext} from 'react';
import todoStore from '../stores/index';
import style from './index.module.less';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
const Result = () => {
  const store = useContext(todoStore);

  return (
    <div className={style.result}>
 
      <h3 className={style.info}>
       完成计划数为:{" "}
        <span className={style.alreadyDone}>{store.alreadyDone}</span>
      </h3>
      <Link to="/todo">
        <Button type="primary">返回todoList</Button>

      </Link>
        </div>
  )
}

export default Result;
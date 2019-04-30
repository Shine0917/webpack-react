import React,{useContext} from "react";
import {Button,List,Icon} from "antd";
import {observer} from 'mobx-react-lite';
import style from './index.module.less';
import {Link} from 'react-router-dom';
import ToDoContext from "../../stores/index";
import TodoMes from '../../components/TodoMes/index'

const ListItem = List.Item;

const TodoList = observer((props:any) => {
  const store = useContext(ToDoContext);
  const {todoItem,notDone,hasDone,checked} = store;
  // console.log("store" ,store);
  return (
    <div>
      <div className={style.header}>  计划列表：</div>
      <List  bordered
      dataSource={todoItem}
      renderItem={item => (<List.Item key={item.id} className={style.wrapper} onClick={() => checked(item.id)}>
        <div className={style.content}>   
          <div className={style.listItem}> {item.content}</div> 
          <div>
            <Icon  
              type={item.isFinished ? "check-circle" : "close-circle"}
              className={item.isFinished ? style.iconcheck : style.checked}
              >
            </Icon>
          </div>
        </div>
        </List.Item>)}
      />
      <TodoMes hasDone={hasDone} notDone={notDone}></TodoMes>

      <Link to="/hooks-result"  >
        <Button type="primary" className={style.link}>去result页面</Button>
      </Link>

    </div>
  )
})

export default TodoList;
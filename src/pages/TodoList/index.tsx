import React,{useContext} from "react";
import {Button,List,Icon,Alert} from "antd";
import todoStore from '../stores/index';
import {observer} from 'mobx-react-lite';
import style from './index.module.less';
import {Link} from 'react-router-dom';
import Header from '../../components/Header/index';

const ListItem = List.Item;

const TodoList = observer((props:any) => {
  // const { history } = props;
  const store = useContext(todoStore);
 const {todoItem,notDone,hasDone,checked} = store;

  console.log("store" ,store);
  return (
    <div>
      {/* <Header/> */}
      <h3 style={{ marginBottom: 16 ,textAlign:'center'}}>  计划列表：</h3>
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

      <Alert message={`${hasDone} 个计划已完成`} type="success" className={style.message}/>
      <Alert message={`${notDone} 个计划未完成`} type="warning" />
      <Alert message={`完成度: ${hasDone} / ${notDone + hasDone}`} type="info" />
      <Link to="/result"  >
        <Button type="primary" className={style.link}>跳到result页面，看结果</Button>
      </Link>

    </div>
  )
})

export default TodoList;
import React from 'react';
// import todoStore from '../../stores/index';
import {observer, inject} from 'mobx-react';
import style from './index.module.less';
import {Button,List,Icon,Alert} from "antd";
import {Link} from 'react-router-dom';
import TodoMes from '../../components/TodoMes/index';

@inject('todoStore')
@observer 
class TodoListC extends React.Component {
  constructor(props){
    super(props);
    // console.log(this.props);
  }

  render() {
      const {todoStore:{todoItem, checked,hasDone,notDone}} = this.props;
      return(
        <div>
        <div className={style.header}> 计划列表：</div>
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
      {/* <Alert message={`${hasDone} 个计划已完成`} type="success" className={style.message}/>
      <Alert message={`${notDone} 个计划未完成`} type="warning" />
      <Alert message={`完成度: ${hasDone} / ${notDone + hasDone}`} type="info" /> */}

      <Link to="/result">
        <Button type="primary" className={style.link}>去result页面</Button>
      </Link>
        </div>
      )
  }

}

export default TodoListC;
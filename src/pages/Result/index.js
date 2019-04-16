import React,{useContext} from 'react';
import todoStore from '../../stores/index';
import style from './index.module.less';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import { inject,observer } from 'mobx-react';

@inject('todoStore')
@observer
class ResultC extends React.Component {
  constructor(props){
    super(props);
    console.log('props',this.props);
  }
  render() {
    const {todoStore:{todoItem, hasDone}} = this.props;

    return (
      <div className={style.result}>

      <h3 className={style.info}>
       完成计划数为:{" "}
        <span className={style.alreadyDone}>{hasDone}</span>
      </h3>
      <Link to="/todo-c">
        <Button type="primary">返回todoList</Button>
      </Link>
        </div>
    )
  }
}
// const ResultC = () => {
//   const store = useContext(todoStore);

//   return (
//     <div className={style.result}>
 
//       <h3 className={style.info}>
//        完成计划数为:{" "}
//         <span className={style.alreadyDone}>{store.hasDone}</span>
//       </h3>
//       <Link to="/todo-c">
//         <Button type="primary">返回todoList</Button>

//       </Link>
//         </div>
//   )
// }

export default ResultC;
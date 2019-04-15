import { observable, computed, action } from 'mobx';
import {createContext} from 'react';

export interface  ITodoItem {
  id: number;
  content: string;
  isFinished:boolean;
}

export interface ITodoStore {
  todoItem: ITodoItem[];
notDone:number;
hasDone: number;
checked:(id:number) => void;
}

class TodoStore implements ITodoStore {
  @observable public todoItem = [
    { id: 1, content: "起床", isFinished: true },
    { id: 2, content: "刷牙洗脸", isFinished: true },
    { id: 3, content: "买早餐", isFinished: false },
    { id: 4, content: "坐公交", isFinished: true },
    { id: 5, content: "公交上看刷微博", isFinished: false },
    { id: 6, content: "工作", isFinished: false },
    { id: 7, content: "吃中饭", isFinished: false },
  ];

  @computed
   get notDone(): number {
    return this.todoItem.filter(i => !i.isFinished).length;
  }
  @computed 
  get hasDone(): number{
    return this.todoItem.filter(i => i.isFinished).length;
  }
  @observable
   checked =(id:number) =>{
    this.todoItem =  this.todoItem.map(i => {
      if(i.id === id) {
        return { ...i, isFinished: !i.isFinished };
      }
      return i;
    })
  }

}

export default createContext(new TodoStore());

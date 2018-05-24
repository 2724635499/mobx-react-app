import UserStore from './userStore';
import TodoStore from './todoStore';

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.todoStore = new TodoStore(this);
  }
}

export default RootStore;

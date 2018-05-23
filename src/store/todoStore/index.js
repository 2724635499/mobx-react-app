import { observable } from 'mobx'

class TodoStore {
  @observable
  todos = [
    {
      name: 'chen1'
    },
    {
      name: 'chen2'
    },
    {
      name: 'chen3'
    },
    {
      name: 'chen4'
    }
  ]

  constructor(rootStore) {
    this.rootStore = rootStore
  }
}
export default TodoStore

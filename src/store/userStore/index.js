class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  getTodos(user) {
    // 通过根 store 来访问 todoStore
    return this.rootStore.todoStore.todos.filter(todo => todo.author === user)
  }
}

export default UserStore

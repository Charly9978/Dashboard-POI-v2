import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export enum Recipient {
  AUTORITY = 'Autorités',
  MUNICIPALTY = 'Mairies',
  NEIGHBOURHOOD = 'Voisinage',
}

export interface Todo {
  id: number;
  created_at: string;
  updated_at: string;
  close_at: string |null;
  objectifDate: string;
  description: string;
  exerciceDescription: string | null;
  comments: string | null;
  typeOfTodo: Recipient | 'Live'
  incidentId: number
}

type CreateTodo = Partial<Todo>


interface RecordTodo {
  delay: number;
  description: string;
  excercice_description: string;
  repeatTime: number |null;
  recipient: Recipient;
}

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[]
  }),

  getters: {
    openTodos (state) {
      return state.todos.filter(todo => !todo.close_at)
    },

    closedTodos(state){
      return state.todos.filter(todo=>todo.close_at)
    },

    getTodoById:(state)=>{
      return (id:number)=>state.todos.find(todo=>todo.id == id)
    }

    
  },

  actions: {
    async getTodos(id:number){
      try {
        const resp = await api.get<Todo[]>('/todos',{params:{'incidentId':id}})
        this.todos = resp.data
      } catch (error) {
        throw error
      }
    },

    async updateTodo (todo:Todo) {
      try {
        const resp = await api.patch<Todo>(`/todos/${todo.id}`,todo)
        const updatedTodo = resp.data
        const index = this.todos.findIndex(todo=>todo.id == updatedTodo.id)
        this.todos.splice(index,1,updatedTodo)
      } catch (error) {
        throw error
      }
    },

    async closeTodo(id:number){
      const todoToUpdate = this.todos.find(todo=>todo.id == id)
      if(todoToUpdate){
        todoToUpdate.close_at= new Date().toISOString()
        await this.updateTodo(todoToUpdate)
      }
    },
    async openTodo(id:number){
      const todoToUpdate = this.todos.find(todo=>todo.id == id)
      if(todoToUpdate){
        todoToUpdate.close_at= null
        await this.updateTodo(todoToUpdate)
      }
    },

    async createTodo(todo:CreateTodo){
      const resp = await api.post<Todo>('/todos',todo)
      this.todos.push(resp.data)
    },

    async deleteTodo(id:number){
      try {
        await api.delete(`/todos/${id}`)
        const index = this.todos.findIndex(todo=>todo.id == id)
        this.todos.splice(index,1)
      } catch (error) {
        throw error
      }
    },

    async createTodoFor(incidentId: number, recipient: Recipient){
      try {
        const resp = await api.get<RecordTodo[]>('/record-todos',{params:{recipient}})
        const recordTodos = resp.data
        recordTodos.forEach(async recordTodo => {
          const newTodo:CreateTodo = {
            description: recordTodo.description,
            objectifDate: new Date(Date.now()+recordTodo.delay*60*1000).toISOString(),
            incidentId,
            exerciceDescription: recordTodo.excercice_description,
            typeOfTodo: recordTodo.recipient
          }
          await this.createTodo(newTodo)
        })
      } catch (error) {
        throw error
      }
    },

    async deleteTodoFor(recipient: Recipient){
      const todosToDelete = this.todos.filter(todo => todo.typeOfTodo == recipient && !todo.close_at)
      todosToDelete.forEach(async todo => await this.deleteTodo(todo.id))
    }
  }
});

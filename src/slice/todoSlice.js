import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () =>{
    const localTodoList = JSON.parse(localStorage.getItem('todoList'));
    if(localTodoList) return localTodoList;
    else return[]
}

const initialValue = {
    filterStatus: 'all',
    todoList : getInitialTodo()
};

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers:{
        addTodo:(state, action)=>{
            state.todoList.push(action.payload);
            const todoList = JSON.parse(localStorage.getItem('todoList'));
            if(todoList){
                todoList.push({...action.payload,})
                localStorage.setItem('todoList',JSON.stringify(todoList))
            } else{
                localStorage.setItem('todoList', JSON.stringify([{...action.payload}]))
            }
        },
        updateTodo:(state, action)=>{
            const todoList = JSON.parse(localStorage.getItem('todoList'));
            if(todoList){
                todoList.forEach((todo)=>{
                    if(todo.id === action.payload.id){
                        todo.title = action.payload.title;
                        todo.status = action.payload.status;
                    }
                });
                localStorage.setItem('todoList', JSON.stringify(todoList));
                state.todoList = todoList;
            }
        },
        deleteTodo:(state, action)=>{
            const todoList = JSON.parse(localStorage.getItem('todoList'));
            if(todoList){
                todoList.forEach((todo, index) => {
                    if(todo.id === action.payload)
                        todoList.splice(index, 1);
                });
                localStorage.setItem('todoList', JSON.stringify(todoList));
                state.todoList = todoList;
            }
        },
        updateFilterStatus:(state, action)=>{
            state.filterStatus = action.payload
        }
    }
});

export const {addTodo, updateTodo, deleteTodo, updateFilterStatus} = todoSlice.actions;
export default todoSlice.reducer;
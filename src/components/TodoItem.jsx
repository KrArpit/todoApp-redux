import { useEffect, useState } from 'react'
import style from '../style/modules/todoItem.module.scss'
import { combineClasses } from '../utils/combineClasses'
import {format} from 'date-fns'
import { MdDelete, MdEdit } from 'react-icons/md'
import { updateTodo } from '../slice/todoSlice'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../slice/todoSlice'
import toast from 'react-hot-toast'
import TodoModal from './TodoModal'
import CheckBox from './CheckBox'
import {motion} from 'framer-motion'

//Animation Framer Motion
const child ={
    hidden:{y:20, opacity:0},
    visible:{
      y:0,
      opacity: 1
    }
  }

function TodoItem({todo}) {

    const dispatch = useDispatch();
    const [updateModalOpen, setUpadteModalOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
        if(todo.status === 'complete')
            setChecked(true);
        else
            setChecked(false);
    },[todo.status]);
    
    const handelDelete =()=>{
        dispatch(deleteTodo(todo.id));
        toast.success('Todo deleted successfully')
    }
    const handelEdit =()=>{
        setUpadteModalOpen(true);
    }
    const handleCheck = () => {
        setChecked(!checked);
        const newStatus = todo.status === 'complete' ? 'incomplete' : 'complete';
        dispatch(updateTodo({
            ...todo,
            status: newStatus
        }))
    }


  return (
    <>
      <motion.div className={style.item}
                variants={child}>
        <div className={style.todoDetails}>
            <CheckBox checked={checked} handleCheck={handleCheck}></CheckBox>
            <div className={style.texts}>
                <p className={combineClasses([style.todoText, todo.status === 'complete' && style['todoText--completed']])}>{todo.title}</p>
                <p className={style.time}>
                    {format(new Date(todo.time),'p, MM/dd/yyyy')}
                    </p>
            </div>
        </div>
        <div className={style.todoActions}>
            <div className={style.icon}
                onClick={() => handelDelete()}
                role='button'>
                <MdDelete/>
            </div>
            <div className={style.icon}
                onClick={() => handelEdit()}
                role='button'>
                <MdEdit/>
            </div>
        </div>
    </motion.div>
    <TodoModal type="update" modalOpen={updateModalOpen} setModalOpen={setUpadteModalOpen} todo={todo}></TodoModal>
    </>
  )
}

export default TodoItem
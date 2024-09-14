import style from '../style/modules/app.module.scss'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'
import { AnimatePresence, motion } from 'framer-motion'

//Animation with framer motion
const container = {
  hidden:{ opacity:1 },
  visible:{
    opacity:1,
    scale:1,
    transition:{
      staggerChildren:0.2,
    }
  }
}
const child ={
  hidden:{y:20, opacity:0},
  visible:{
    y:0,
    opacity: 1
  }
}

function AppContent() {

  const todoList = useSelector((state)=> state.todo.todoList)
  const sortedTodoList = [...todoList]
  sortedTodoList.sort((a,b) => new Date(b.time) - new Date(a.time));
  
  const filterStatus = useSelector((state)=> state.todo.filterStatus);

  const filterTodoList = sortedTodoList.filter(todo => {
    if(filterStatus === 'all') return true;
    return todo.status === filterStatus;
  }
  );

  return (
    <motion.div className={style.content__wrapper}
        variants={container}
        initial="hidden"
        animate="visible">
          <AnimatePresence>
      {(filterTodoList && filterTodoList.length>0)? filterTodoList.map((todo)=> <TodoItem todo={todo} key={todo.id}/>):
      <motion.p className={style.emptyText}
          variants={child}>
        No Todo Found
        </motion.p>}
        </AnimatePresence>
      </motion.div>
  )
}

export default AppContent
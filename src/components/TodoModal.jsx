import { useEffect, useRef, useState } from 'react'
import {MdOutlineClose} from 'react-icons/md'
import style from '../style/modules/modal.module.scss'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { addTodo, updateTodo } from '../slice/todoSlice'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import {AnimatePresence, motion} from 'framer-motion'

//Animation Framer Motion
const dropIn = {
    hidden: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
  };

function TodoModal({ type, modalOpen, setModalOpen, todo}) {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('incomplete');
    const inputRef = useRef(null)

    useEffect(()=>{
        if(modalOpen){
            inputRef.current.focus();
            if(type === 'update' && todo){
                setTitle(todo.title);
                setStatus(todo.status);
            }
            else{
                setTitle('');
                setStatus('incomplete');
            }
        }
    },[todo, type, modalOpen]);

    const handelSubmit = (e) => {
        e.preventDefault();
        if(title && status){
            if(type==='add'){
                dispatch(addTodo({
                    id: uuidv4(),
                    title, 
                    status,
                    time: new Date().getTime(),
                    formattedDate: new Date().toLocaleTimeString()
                }))
                setModalOpen(false);
                toast.success('Task added successfully');
            }
            if(type === 'update'){
                if(todo.title !== title || todo.status !== status){
                    dispatch(updateTodo({
                        ...todo,
                        title,
                        status
                    }))
                    toast.success("Todo updated successfully");
                    setModalOpen(false);
                } else{
                    toast.error('No change made in todo');
                }
            }
        } else {
            toast.error("Title shouldn't be empty");
        }
    }

  return (
    <AnimatePresence>
    {modalOpen && (
    <motion.div className={style.wrapper}
    //animation
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
        <motion.div className={style.container}
        //animation
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
            <motion.div className={style.closeButton}
                onClick={() => setModalOpen(false)}
                role='button'
                //animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
                >
                <MdOutlineClose/>
            </motion.div>
            <form action="" className={style.form} onSubmit={(e)=>handelSubmit(e)}>
                <h1 className={style.formTitle}>{type==="update"?'Update':'Add'} Task</h1>
                <label htmlFor="title">
                    Title
                <input type="text" id='title' value={title} onChange={(e)=>setTitle(e.target.value)} ref={inputRef} />
                </label>
                <label htmlFor="status">Status
                <select name="status" id="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                </select>
                </label>
                <div className={style.buttonContainer}>
                    <Button type='submit' varient="primary">{type==="update"?'Update':'Add'} Task</Button>
                    <Button varient="secondary" onClick={()=>setModalOpen(false)}>Cancel</Button>
                </div>
            </form>
        </motion.div>
    </motion.div>
    )}
     </AnimatePresence>
  )
}

export default TodoModal
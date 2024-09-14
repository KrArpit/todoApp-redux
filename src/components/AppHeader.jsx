import { useState } from "react";
import Button, { SelectButton } from "./Button";
import style from "../style/modules/app.module.scss";
import TodoModal from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../slice/todoSlice";

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector((state)=> state.todo.filterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    console.log("e.target.value");
    
    dispatch(updateFilterStatus(e.target.value))
  }

  return (
    <div className={style.appHeader}>
      <Button varient="primary" onClick={() => setModalOpen(true)}>
        Add Todo
      </Button>
      <SelectButton id="status" value={filterStatus} onChange={updateFilter} >
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen}></TodoModal>
    </div>
  );
}

export default AppHeader;

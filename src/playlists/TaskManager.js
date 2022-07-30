import "../index.css";
import Task from "./Task";
import { useState, useEffect } from "react";
import {
  collectionGroup,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import AddTask from "./AddTask";

function TaskManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [categories, setCaregories] = useState([]);
  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const catgRef = query(
      collectionGroup(db, "categories")
      // orderBy("created", "desc")
    );
    onSnapshot(catgRef, (snapshot) => {
      setCaregories(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
    const taskColRef = query(
      collectionGroup(db, "playlists")
      // orderBy("created", "desc")
    );
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          parent: doc.parent,
          bit: 87348704923,
        }))
      );
    });
  }, []);

  return (
    <div className="taskManager">
      <header>Task Manager</header>
      <div className="taskManager__container">
        <button onClick={() => setOpenAddModal(true)}>Add task +</button>
        {JSON.stringify(categories)}
        <div className="taskManager__tasks">
          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              title={task.data.name}
              description={task.data.description}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTask
          onClose={() => setOpenAddModal(false)}
          open={openAddModal}
          categories={categories}
        />
      )}
    </div>
  );
}

export default TaskManager;

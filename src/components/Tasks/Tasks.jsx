import React from "react";
import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";

import Axios from "axios";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import { Link } from "react-router-dom";
const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      Axios.patch("https://my-json-server.typicode.com/overstay812/todo_reactJS/lists/" + list.id, {
        name: newTitle,
      }).catch(() => alert("не удалось обновить название списка"));
    }
  };

  const onRemove = (taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      Axios.delete("https://my-json-server.typicode.com/overstay812/todo_reactJS/tasks/" + taskId).catch(() =>
        alert("не удалось удалить задачу")
      );
    }
  };

  return (
    <div className="tasks">
      <Link to={`/listls/${list.id}`}>
        <h2 className="tasks__title" style={{ color: list.color.hex }}>
          {list.name}
          <img src={editSvg} onClick={editTitle} alt="Edit icon" />
      </h2>
        </Link>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              onRemove={onRemoveTask}
              list={list}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};
export default Tasks;

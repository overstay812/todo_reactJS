import Axios from "axios";
import React, { useState } from "react";
import addSvg from "../../assets/img/add.svg";
// import "./Tasks.scss";

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");
  

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    const obj = {
        listId: list.id,
        text: inputValue,
        completed: false,
      }
      setIsLoading(true)
    Axios.post('http://localhost:3001/tasks', obj)
    .then(({ data }) => {
      onAddTask(list.id, data);
      toggleFormVisible();
    })
    .catch((e)=> alert('Ошибка при добавлении задачи!'))
    .finally(()=> setIsLoading(false))
  };
  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div className="tasks__form-new" onClick={toggleFormVisible}>
          <img src={addSvg} alt="add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            type="text"
            placeholder="Текст задачи"
            className="field"
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button className="button" disabled={isLoading} onClick={addTask}>
            {isLoading? 'Добавление...' : 'Добавить задачу' }
          </button>
          <button className="button button--grey" onClick={toggleFormVisible}>
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;

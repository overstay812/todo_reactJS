import React, { useEffect, useState } from "react";
import Axios from "axios";

import List from "../List/List";
import "./AddButtonList.scss";
import closeSvg from "../../assets/img/close.svg";
import Badge from "../Badge/Badge";

const AddButtonList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setInputValue("");
    setSelectedColor(colors[0].id);
    setVisiblePopup(false);
    setVisiblePopup(!visiblePopup);
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    setIsLoading(true);
    Axios.post("http://localhost:3001/lists", {
      name: inputValue,
      colorId: selectedColor,
    })
      .then(({ data }) => {
        const color = colors.filter((item) => item.id === selectedColor)[0];
          
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .catch(()=> {alert('Ошибка при добавлении списка!')})
      .finally(() => setIsLoading(false))
  };

  return (
    <div className="add-list">
      <List
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
          },
        ]}
        onClick={() => setVisiblePopup(!visiblePopup)}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            src={closeSvg}
            alt="close button"
            className="add-list__popup-close-btn"
            onClick={onClose}
          />
          <input
            type="text"
            placeholder="Название списка"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="field"
          />

          <div className="add-list__popup-colors">
            {colors.map((item) => (
              <Badge
                color={item.name}
                key={item.id}
                onClick={() => setSelectedColor(item.id)}
                className={selectedColor === item.id && "active"}
              />
            ))}
          </div>

          <button className="button" onClick={addList}>
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
};
export default AddButtonList;

import React, { useState } from "react";

import List from "../List/List";
import "./AddButtonList.scss";
import closeSvg from "../../assets/img/close.svg";
import Badge from "../Badge/Badge";

const AddButtonList = ({ colors, onAddList }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState("");

  const onClose = () => {
    setInputValue("");
    setSelectedColor(colors[0].id);
    setVisiblePopup(false);
    setVisiblePopup(!visiblePopup)
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    const color = colors.filter((c) => c.id === selectedColor)[0].name;
    onAddList({ id: Math.random(), name: inputValue, color });
    onClose();
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

          <button
            className="button"
            onClick={() => {
              addList();
            }}
          >
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};
export default AddButtonList;

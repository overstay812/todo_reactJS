import React from "react";
import classNames from "classnames";

import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";
import Badge from "../Badge/Badge";
import Axios from "axios";

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      Axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul className="list" onClick={onClick}>
      {items.map((item, index) => (
        <li
          className={classNames(item.className, { active: item.active })}
          key={index}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
      <span>{item.name}</span>
          {isRemovable && (
            <img
              src={removeSvg}
              className="list__remove-icon"
              alt="Remove icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;

import React from "react";
import classNames from "classnames";

import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";
import Badge from "../Badge/Badge";
import Axios from "axios";

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      Axios.delete("https://my-json-server.typicode.com/overstay812/todo_reactJS/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul className="list" onClick={onClick}>
      {items.map((item, index) => (
        <li
          className={classNames(item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id,
          })}
          key={index}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length})`}
          </span>
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

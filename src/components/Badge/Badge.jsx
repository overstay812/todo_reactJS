import React from "react";
import classNames from 'classnames' 
import "./Badge.scss";


const Badge = ({ color, onClick, className }) => (
  <i className={classNames('badge', {[`badge--${color}`]: color}, className )} 
  onClick={()=> onClick()}></i>
);

export default Badge;

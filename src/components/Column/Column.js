import React from "react";
import Task from "../Task/Task";
import "./Column.scss";

export default function Column() {
  return (
    <div className="column">
      <header>ABC</header>
      <ul className="task-list">
        <Task />
        <li className="task-item">Test 1</li>
        <li className="task-item">Test 2</li>
        <li className="task-item">Test 3</li>
        <li className="task-item">Test 4</li>
        <li className="task-item">Test 1</li>
        <li className="task-item">Test 2</li>
        <li className="task-item">Test 3</li>
        <li className="task-item">Test 4</li>
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

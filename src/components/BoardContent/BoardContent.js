import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import Column from "../Column/Column";
import "./BoardContent.scss";

import { Container, Draggable } from "react-smooth-dnd";

import { initialData } from "../../actions/initialData";
import { mapOrder } from "../../utilities/sorts";

export default function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFormDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFormDB) {
      setBoard(boardFormDB);

      setColumns(mapOrder(boardFormDB.columns, boardFormDB.columnsOrder, "id"));
    }
  }, []);

  if (isEmpty(board)) {
    return <div className="not-found">No data</div>;
  }

  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
  };

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        getChildPayload={(index) => columns[index]}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} />
          </Draggable>
        ))}
      </Container>
    </div>
  );
}

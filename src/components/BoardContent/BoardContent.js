import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import Column from "../Column/Column";
import "./BoardContent.scss";

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

  return (
    <div className="board-content">
      {columns.map((column, index) => (
        <Column key={index} column={column} />
      ))}
    </div>
  );
}

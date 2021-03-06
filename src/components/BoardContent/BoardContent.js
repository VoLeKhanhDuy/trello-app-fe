import React, { useEffect, useState, useRef } from "react";
import { isEmpty } from "lodash";
import Column from "../Column/Column";
import "./BoardContent.scss";

import { Container, Draggable } from "react-smooth-dnd";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

import { initialData } from "../../actions/initialData";
import { mapOrder } from "../../utilities/sorts";
import { applyDrag } from "../../utilities/dragDrop";

export default function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColumnForm, setOpenNewColumnForn] = useState(false);
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForn(!openNewColumnForm);
  };

  const newColumnInputRef = useRef(null);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const onNewColumnTitleChange = (e) => {
    setNewColumnTitle(e.target.value);
  };

  useEffect(() => {
    const boardFormDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFormDB) {
      setBoard(boardFormDB);

      setColumns(mapOrder(boardFormDB.columns, boardFormDB.columnsOrder, "id"));
    }
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  }, [openNewColumnForm]);

  if (isEmpty(board)) {
    return <div className="not-found">No data</div>;
  }

  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnsOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];

      let currentColumn = newColumns.find((c) => c.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i.id);

      setColumns(newColumns);
    }
  };

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }

    let newColumns = [...columns];
    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: [],
    };
    newColumns.push(newColumnToAdd);

    let newBoard = { ...board };
    newBoard.columnsOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);

    setNewColumnTitle("");
    toggleOpenNewColumnForm();
  };

  const onUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate.id;

    let newColumns = [...columns];
    const columnIndexToUpdate = newColumns.findIndex(
      (i) => i.id === columnIdToUpdate
    );

    if (newColumnToUpdate._destroy) {
      // remove
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      // update
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);
    }

    let newBoard = { ...board };
    newBoard.columnsOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
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
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
            />
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className="trello-container">
        {!openNewColumnForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon" />
              Add another column
            </Col>
          </Row>
        )}
        {openNewColumnForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column title..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(event) => event.key === "Enter" && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add column
              </Button>
              <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
                <i className="fa fa-trash icon" />
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
}

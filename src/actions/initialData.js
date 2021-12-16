export const initialData = {
  boards: [
    {
      id: "board-1",
      columnsOrder: ["column-1", "column-2", "column-3"],
      columns: [
        {
          id: "column-1",
          boardId: "board-1",
          title: "To do 1",
          cardOrder: ["card-1", "card-2", "card-3", "card-4"],
          cards: [
            {
              id: "card-1",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 1",
              cover:
                "https://image.lag.vn/upload/news/21/11/04/one-piece-1032-1_EKDB.jpg",
            },
            {
              id: "card-2",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 2",
              cover: null,
            },
            {
              id: "card-3",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 3",
              cover: null,
            },
            {
              id: "card-4",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 4",
              cover: null,
            },
          ],
        },
        {
          id: "column-2",
          boardId: "board-1",
          title: "To do 2",
          cardOrder: ["card-5", "card-6", "card-7"],
          cards: [
            {
              id: "card-5",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 5",
              cover: null,
            },
            {
              id: "card-6",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 6",
              cover: null,
            },
            {
              id: "card-7",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 7",
              cover: null,
            },
          ],
        },
        {
          id: "column-3",
          boardId: "board-1",
          title: "To do 3",
          cardOrder: ["card-8", "card-9", "card-10"],
          cards: [
            {
              id: "card-8",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 8",
              cover: null,
            },
            {
              id: "card-9",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 9",
              cover: null,
            },
            {
              id: "card-10",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 10",
              cover: null,
            },
          ],
        },
      ],
    },
  ],
};

"use client";

import { IList, ITask } from "@/types/board-type";
import { create } from "zustand";

interface BoardState {
  lists: IList[];
  setLists: (lists: IList[]) => void;
  updateList: (listId: string, list: Partial<IList>) => void;
  addList: (list: IList) => void;
  removeList: (listId: string) => void;
  addTask: (listId: string, taskTitle: string) => void;
  updateTaskTitle: (listId: string, taskId: string, newTitle: string) => void;
  updateListTitle: (listId: string, newTitle: string) => void;
  updateTaskDone: (listId: string, taskId: string, isDone: boolean) => void;
  setTasks: (listId: string, tasks: ITask[]) => void;
  moveTask: (
    sourceListId: string,
    destinationListId: string,
    taskId: string
  ) => void;
}

const initialLists: IList[] = [
  {
    id: "role",
    title: "Role",
    tasks: [
      {
        id: "1",
        title: "TESTER",
        assignees: ["TT", "AT"],
        isSubscribe: true,
        startDate: "2024-03-10",
        dueDate: "2024-03-15",
        isDone: false,
      },
      {
        id: "2",
        title: "DEV",
        assignees: ["TT", "TD", "AT"],
        isSubscribe: true,
        startDate: "2024-03-12",
        dueDate: "2024-03-20",
        isDone: false,
      },
    ],
  },
  {
    id: "prejob",
    title: "PRE JOB",
    tasks: [
      {
        id: "3",
        title: "Thực hiện whitebox testing",
        checklist: { total: 1, completed: 1 },
        comments: 3,
        assignees: ["TD", "AT", "TT"],
        isSubscribe: true,
        isDone: true,
      },
      {
        id: "4",
        title: "Thực hiện blackbox testing",
        checklist: { total: 1, completed: 1 },
        assignees: ["TD", "AT", "TT"],
        isSubscribe: true,
        dueDate: "2024-03-23",
        isDone: true,
      },
      {
        id: "5",
        title: "Sample thẻ bug report",
        labels: [
          { text: "Minor", color: "#205781" },
          { text: "Low", color: "#7D1C4A" },
        ],
        checklist: { total: 1, completed: 0 },
        assignees: ["TD"],
        isSubscribe: false,
        startDate: "2025-03-20",
        isDone: false,
      },
      {
        id: "6",
        title: "Sample thẻ bug report",
        labels: [
          { text: "Minor", color: "#205781" },
          { text: "Low", color: "#7D1C4A" },
          { text: "Low", color: "#7D1C4A" },
          { text: "Low", color: "#7D1C4A" },
          { text: "Low", color: "#7D1C4A" },
        ],
        checklist: { total: 1, completed: 0 },
        assignees: ["TD"],
        isSubscribe: false,
        dueDate: "2025-03-24",
        isDone: false,
      },
      {
        id: "7",
        title: "Sample thẻ bug report",
        labels: [
          { text: "Minor", color: "#205781" },
          { text: "Low", color: "#7D1C4A" },
        ],
        checklist: { total: 1, completed: 0 },
        assignees: ["TD"],
        isSubscribe: false,
        isDone: false,
      },
      {
        id: "8",
        title: "Sample thẻ bug report",
        labels: [
          { text: "Minor", color: "#205781" },
          { text: "Low", color: "#7D1C4A" },
        ],
        checklist: { total: 1, completed: 0 },
        assignees: ["TD"],
        isSubscribe: false,
        isDone: false,
      },
    ],
  },
  {
    id: "reported",
    title: "REPORTED",
    tasks: [],
  },
  {
    id: "todo",
    title: "TO DO",
    tasks: [],
  },
  {
    id: "inprogress",
    title: "IN PROGRESS",
    tasks: [],
  },
  {
    id: "done",
    title: "DONE",
    tasks: [],
  },
];

export const useBoardStore = create<BoardState>((set) => ({
  lists: initialLists,

  setLists: (lists) => set({ lists }),

  updateList: (listId, updatedList) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId ? { ...list, ...updatedList } : list
      ),
    })),

  addList: (newList) =>
    set((state) => ({
      lists: [...state.lists, newList],
    })),

  removeList: (listId) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== listId),
    })),

  addTask: (listId, taskTitle) =>
    set((state) => ({
      lists: state.lists.map((list) => {
        if (list.id === listId) {
          const newTask: ITask = {
            id: Date.now().toString(),
            title: taskTitle,
            assignees: [],
            isSubscribe: false,
            labels: [],
            checklist: { total: 0, completed: 0 },
            startDate: new Date().toISOString().split("T")[0],
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
            isDone: false,
          };
          return {
            ...list,
            tasks: [...list.tasks, newTask],
          };
        }
        return list;
      }),
    })),

  updateTaskTitle: (listId, taskId, newTitle) =>
    set((state) => ({
      lists: state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: list.tasks.map((task) => {
              if (task.id === taskId) {
                return {
                  ...task,
                  title: newTitle,
                };
              }
              return task;
            }),
          };
        }
        return list;
      }),
    })),

  updateListTitle: (listId, newTitle) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              title: newTitle,
            }
          : list
      ),
    })),

  updateTaskDone: (listId, taskId, isDone) =>
    set((state) => ({
      lists: state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: list.tasks.map((task) => {
              if (task.id === taskId) {
                return {
                  ...task,
                  isDone,
                };
              }
              return task;
            }),
          };
        }
        return list;
      }),
    })),

  setTasks: (listId, tasks) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks,
            }
          : list
      ),
    })),

  moveTask: (sourceListId, destinationListId, taskId) =>
    set((state) => {
      // Tìm task cần di chuyển
      const sourceList = state.lists.find((list) => list.id === sourceListId);
      if (!sourceList) return state;

      const taskToMove = sourceList.tasks.find((task) => task.id === taskId);
      if (!taskToMove) return state;

      // Tạo danh sách mới cho source list (không chứa task đã di chuyển)
      const updatedSourceList = {
        ...sourceList,
        tasks: sourceList.tasks.filter((task) => task.id !== taskId),
      };

      // Tìm destination list và thêm task vào
      const updatedLists = state.lists.map((list) => {
        if (list.id === sourceListId) {
          return updatedSourceList;
        }
        if (list.id === destinationListId) {
          return {
            ...list,
            tasks: [...list.tasks, taskToMove],
          };
        }
        return list;
      });

      return { lists: updatedLists };
    }),
}));

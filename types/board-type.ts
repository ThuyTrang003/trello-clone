export interface IAssignee {
  id: string;
  name: string;
  avatar: string;
}

export interface ITask {
  id: string;
  title: string;
  assignees: IAssignee[];
  isSubscribe?: boolean;
  startDate?: string;
  dueDate?: string;
  labels?: {
    text: string;
    color: string;
  }[];
  checklist?: {
    total: number;
    completed: number;
  };
  comments?: number;
  isDone?: boolean;
}

export interface IList {
  id: string;
  title: string;
  tasks: ITask[];
}

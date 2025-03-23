export interface IAssignee {
  id: string;
  isMyAccount: boolean;
}

export interface ITask {
  id: string;
  title: string;
  assignees: string[];
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

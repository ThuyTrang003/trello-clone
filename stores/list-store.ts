export interface Label {
  labelId: string;
  labelTitle: string;
  labelColor: string;
}

export const dummyLabels: Label[] = [
  {
    labelId: "label-1",
    labelTitle: "Quan trọng",
    labelColor: "#FF0000",
  },
  {
    labelId: "label-2",
    labelTitle: "Công việc",
    labelColor: "#00FF00",
  },
  {
    labelId: "label-3",
    labelTitle: "Cá nhân",
    labelColor: "#0000FF",
  },
];

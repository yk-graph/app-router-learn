export type TodoType = {
  name: string;
  fields: {
    task: { stringValue: string };
    isDone: { booleanValue: boolean };
    createdAt: { timestampValue: string };
    updatedAt: { timestampValue: string };
  };
};

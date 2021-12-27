import { Schema, model } from "mongoose";

export interface Workspace {
  userId: string;
  name: string;
  description: string;
  boards: Board[];
}

type Board = {
  name: string;
  color: string;
  labels: Label[];
  lists: List[];
};

type List = {
  name: string;
  archived: boolean;
  cards: Card[];
};

type Card = {
  title: string;
  description: string;
  archived: boolean;
  comments: Comment[];
  labelsSelected: Label[];
};

type Label = {
  title: string;
  color: string;
  selected?: boolean;
};

type Comment = {
  date: string;
  comment: string;
};

const schema = new Schema<Workspace>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  boards: [
    {
      name: { type: String, required: true },
      lists: [
        {
          title: { type: String, required: true },
          archived: { type: Boolean, default: false },
          cards: [
            {
              title: { type: String, required: true },
              description: { type: String, required: false },
              archived: { type: Boolean, default: false },
              labelsSelected: { type: Array, required: false },
              comments: [
                {
                  comment: { type: String, required: true },
                  created_at: { type: Date, required: true, default: Date.now },
                },
              ],
              attachments: [
                {
                  fileId: { type: Schema.Types.ObjectId, required: true },
                  filename: { type: String, required: true },
                  mimetype: { type: String, required: true },
                  size: { type: Number, required: true },
                },
              ],
            },
          ],
        },
      ],
      color: { type: String, required: true },
      labels: [
        {
          color: { type: String, required: false },
          title: { type: String, required: false },
          checked: { type: Boolean, required: false },
        },
      ],
    },
  ],
});

export const WorkspaceModel = model<Workspace>("Workspace", schema);

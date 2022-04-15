import { Schema, model } from 'mongoose';

export interface IForm {
  formType: string;
  fullName: string;
  personalId: string;
  submitTime: string;
  lastUpdateTime: string;
  creatorIp: string;
}

export const FormSchema = new Schema<IForm>({
  formType: { type: String, required: true },
  fullName: { type: String, required: true },
  personalId: { type: String, required: true },
  creatorIp: { type: String, required: true },
}, { strict: false, versionKey: false, timestamps: { createdAt: "submitTime", updatedAt: "lastUpdateTime" } });

export const Form = model<IForm>('From', FormSchema);

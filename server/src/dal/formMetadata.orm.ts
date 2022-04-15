import { Schema, model } from 'mongoose';

export interface IFormField {
  name: string,
  label: string,
  fieldType: 'number' | 'date' | 'string'
}

export interface IFormMetadata {
  formType: string;
  fields: IFormField[]
}

export const FormMetadataSchema = new Schema<IFormMetadata>({
  formType: { type: String, required: true },
  fields: [{
    type: new Schema<IFormField>({
      fieldType: { type: String, required: true },
      label: { type: String, required: true },
      name: { type: String, required: true },
    }),
    default: []
  }]
}, { versionKey: false });

export const FormMetadata = model<IFormMetadata>('FromMetadata', FormMetadataSchema);

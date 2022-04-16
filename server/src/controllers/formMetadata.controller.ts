import { FormMetadata, IFormField, IFormMetadata } from '../dal/formMetadata.orm';
import { Request } from 'express';
import { JsonController, Get, Param, Post, Req, Patch, Delete, Body, UseBefore } from 'routing-controllers';
import { isAdmin } from '../middlewares/auth.middleware';

const adminExtendedFields: IFormField[] = [{ name: "commander", label: "מפקד אישי", fieldType: "string" }];

@JsonController('/formsMetadata')
export class FormMetadataController {
  @Get('/')
  async getAll() {
    const allForms = await FormMetadata.find().lean();
    return allForms.map(form => ({ ...form, _id: form._id.toString() }));
  }

  @Get('/extended')
  @UseBefore(isAdmin)
  async getAllExtended() {
    const allForms = await FormMetadata.find().lean();
    return allForms.map(({ _id, fields, formType }) => ({ formType, _id: _id.toString(), fields: [...fields, ...adminExtendedFields] }));
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const formById = await FormMetadata.findById(id).lean();
    return { ...formById, _id: formById._id.toString() };
  }

  @Post('/')
  @UseBefore(isAdmin)
  async create(@Body() newForm: IFormMetadata, @Req() { ip }: Request) {
    const createdFormMetadata = await new FormMetadata({ ...newForm, creatorIp: ip }).save();
    return createdFormMetadata._id.toString();
  }

  @Patch('/:id')
  @UseBefore(isAdmin)
  async patch(@Param('id') id: string, @Body() updatedFormFields: Partial<IFormMetadata>) {
    await FormMetadata.findByIdAndUpdate(id, updatedFormFields);
    return id;
  }

  @Delete('/:id')
  @UseBefore(isAdmin)
  async remove(@Param('id') id: string) {
    await FormMetadata.findByIdAndRemove(id);
    return id;
  }
}

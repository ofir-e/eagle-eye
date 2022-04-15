import { Form, IForm } from '../dal/form.orm';
import { Request } from 'express';
import { JsonController, Get, Param, Post, Req, Patch, Delete, Body, QueryParam } from 'routing-controllers';

@JsonController('/forms')
export class FormController {
  @Get('/')
  async getAll(@QueryParam('formType') formType: string) {
    const query = formType ? { formType } : {};
    const allForms = await Form.find(query).lean();
    return allForms.map(form => ({ ...form, _id: form._id.toString() }));
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const formById = await Form.findById(id).lean();
    return { ...formById, _id: formById._id.toString() };
  }

  @Post('/')
  async create(@Body() newForm: IForm, @Req() { ip }: Request) {
    const createdForm = await new Form({ ...newForm, creatorIp: ip }).save();
    return createdForm._id.toString();
  }

  @Patch('/:id')
  async patch(@Param('id') id: string, @Body() updatedFormFields: Partial<IForm>) {
    await Form.findByIdAndUpdate(id, updatedFormFields);
    return id;
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await Form.findByIdAndRemove(id);
    return id;
  }
}

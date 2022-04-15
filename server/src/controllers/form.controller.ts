import { Form, IForm } from '../dal/form.orm';
import { Request } from 'express';
import { JsonController, Get, Param, Post, Req, Patch, Delete, Body } from 'routing-controllers';

@JsonController('/forms')
export class FormController {
  @Get('/')
  async getAll() {
    const allForms = await Form.find().lean();
    return allForms;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const formById = await Form.findById(id).lean();
    return formById;
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

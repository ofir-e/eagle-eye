import { FormMetadata, IFormMetadata } from '../dal/formMetadata.orm';
import { Request } from 'express';
import { JsonController, Get, Param, Post, Req, Patch, Delete, Body } from 'routing-controllers';

@JsonController('/formsMetadata')
export class FormMetadataController {
  @Get('/')
  async getAll() {
    const allForms = await FormMetadata.find().lean();
    return allForms;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const formById = await FormMetadata.findById(id).lean();
    return formById;
  }

  @Post('/')
  async create(@Body() newForm: IFormMetadata, @Req() { ip }: Request) {
    const createdFormMetadata = await new FormMetadata({ ...newForm, creatorIp: ip }).save();
    return createdFormMetadata._id.toString();
  }

  @Patch('/:id')
  async patch(@Param('id') id: string, @Body() updatedFormFields: Partial<IFormMetadata>) {
    await FormMetadata.findByIdAndUpdate(id, updatedFormFields);
    return id;
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await FormMetadata.findByIdAndRemove(id);
    return id;
  }
}

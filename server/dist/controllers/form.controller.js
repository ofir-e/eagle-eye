"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormController = void 0;
const tslib_1 = require("tslib");
const form_orm_1 = require("../dal/form.orm");
const routing_controllers_1 = require("routing-controllers");
let FormController = class FormController {
    async getAll() {
        const allForms = await form_orm_1.Form.find().lean();
        return allForms;
    }
    async getById(id) {
        const formById = await form_orm_1.Form.findById(id).lean();
        return formById;
    }
    async create(newForm, { ip }) {
        const createdForm = await new form_orm_1.Form(Object.assign(Object.assign({}, newForm), { creatorIp: ip })).save();
        return createdForm._id.toString();
    }
    async patch(id, updatedFormFields) {
        await form_orm_1.Form.findByIdAndUpdate(id, updatedFormFields);
        return id;
    }
    async remove(id) {
        await form_orm_1.Form.findByIdAndRemove(id);
        return id;
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FormController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FormController.prototype, "getById", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FormController.prototype, "create", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Patch)('/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FormController.prototype, "patch", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FormController.prototype, "remove", null);
FormController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/forms')
], FormController);
exports.FormController = FormController;

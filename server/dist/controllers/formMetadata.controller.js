"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormMetadataController = void 0;
const tslib_1 = require("tslib");
const formMetadata_orm_1 = require("../dal/formMetadata.orm");
const routing_controllers_1 = require("routing-controllers");
let FormMetadataController = class FormMetadataController {
    async getAll() {
        const allForms = await formMetadata_orm_1.FormMetadata.find().lean();
        return allForms.map(form => (Object.assign(Object.assign({}, form), { _id: form._id.toString() })));
    }
    async getById(id) {
        const formById = await formMetadata_orm_1.FormMetadata.findById(id).lean();
        return Object.assign(Object.assign({}, formById), { _id: formById._id.toString() });
    }
    async create(newForm, { ip }) {
        const createdFormMetadata = await new formMetadata_orm_1.FormMetadata(Object.assign(Object.assign({}, newForm), { creatorIp: ip })).save();
        return createdFormMetadata._id.toString();
    }
    async patch(id, updatedFormFields) {
        await formMetadata_orm_1.FormMetadata.findByIdAndUpdate(id, updatedFormFields);
        return id;
    }
    async remove(id) {
        await formMetadata_orm_1.FormMetadata.findByIdAndRemove(id);
        return id;
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FormMetadataController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FormMetadataController.prototype, "getById", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FormMetadataController.prototype, "create", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Patch)('/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FormMetadataController.prototype, "patch", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FormMetadataController.prototype, "remove", null);
FormMetadataController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/formsMetadata')
], FormMetadataController);
exports.FormMetadataController = FormMetadataController;

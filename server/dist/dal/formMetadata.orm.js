"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormMetadata = exports.FormMetadataSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FormMetadataSchema = new mongoose_1.Schema({
    formType: { type: String, required: true },
    fields: [{
            type: new mongoose_1.Schema({
                fieldType: { type: String, required: true },
                label: { type: String, required: true },
                name: { type: String, required: true },
            }),
            default: []
        }]
}, { versionKey: false });
exports.FormMetadata = (0, mongoose_1.model)('FromMetadata', exports.FormMetadataSchema);

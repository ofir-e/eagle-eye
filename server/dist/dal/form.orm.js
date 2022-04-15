"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = exports.FormSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FormSchema = new mongoose_1.Schema({
    formType: { type: String, required: true },
    fullName: { type: String, required: true },
    personalId: { type: String, required: true },
    creatorIp: { type: String, required: true },
}, { strict: false, versionKey: false, timestamps: { createdAt: "submitTime", updatedAt: "lastUpdateTime" } });
exports.Form = (0, mongoose_1.model)('From', exports.FormSchema);

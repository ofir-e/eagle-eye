"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form_controller_1 = require("./controllers/form.controller");
const formMetadata_controller_1 = require("./controllers/formMetadata.controller");
const mongoose_1 = require("mongoose");
const routing_controllers_1 = require("routing-controllers");
require("reflect-metadata");
const uri = "mongodb+srv://tese123:test123@cluster0.00o2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [form_controller_1.FormController, formMetadata_controller_1.FormMetadataController],
    cors: {
        origin: '*'
    }
});
const main = async () => {
    await (0, mongoose_1.connect)(uri);
    app.listen(3001);
};
main().then(() => { console.log('Express server is running on port 3001. Open http://localhost:3001/forms/'); });

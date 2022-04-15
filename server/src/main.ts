import { FormController } from './controllers/form.controller';
import { FormMetadataController } from './controllers/formMetadata.controller';
import {connect} from 'mongoose';
import { createExpressServer } from 'routing-controllers';
import "reflect-metadata" 

const uri = "mongodb+srv://tese123:test123@cluster0.00o2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = createExpressServer({
  controllers: [FormController, FormMetadataController],
  cors: {
    origin: '*'
  }
});

const main = async () => {
  await connect(uri)
  app.listen(3001);
}

main().then(()=>{console.log('Express server is running on port 3001. Open http://localhost:3001/forms/');})


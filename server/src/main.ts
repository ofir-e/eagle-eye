import { FormController } from './controllers/form.controller';
import { FormMetadataController } from './controllers/formMetadata.controller';
import {connect} from 'mongoose';
import { createExpressServer } from 'routing-controllers';
import "reflect-metadata" 

const uri = "mongodb://host.docker.internal:27017/eagle-eye";

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


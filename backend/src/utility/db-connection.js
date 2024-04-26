import mongoose from 'mongoose';
import configs from '../config/index.js';

const dbName = configs.dbName;
const uri = `${configs.mongodb.uri}/${dbName}`;

async function connect() {
   try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(uri);
      console.log('Connected to MongoDB database');
      return true;
   } catch (error) {
      console.log('Cannot connect to the database: ',error);
   }
}

export default connect;

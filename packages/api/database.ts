import {ConnectOptions, connect, connection} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const options: ConnectOptions = {
  autoIndex: false,
};

const {
  MONGO_HOSTNAME,
  MONGO_DB,
  MONGO_PORT
} = process.env;

const dbConnectionURL = {
  'LOCALURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
};

connect(dbConnectionURL.LOCALURL, options);

connection.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL));
connection.once('open', () => {
  console.log('Mongodb Connection Successful');
});

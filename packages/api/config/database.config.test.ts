import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect as mongoConnect, connection, ConnectOptions } from 'mongoose';

let mongod: MongoMemoryServer;

const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const mongoUri = mongod.getUri();
  const mongooseOpts: ConnectOptions = {
    maxPoolSize: 10,
  };

  await mongoConnect(mongoUri, mongooseOpts);
};

const closeDatabase = async () => {
  await connection.dropDatabase();
  await connection.close();
  await mongod.stop();
};

const clearDatabase = async () => {
  const collections = await connection.db.collections();

  collections.forEach((collection) => {
    collection.deleteMany({});
  });
};

const mongoTest = {
  connect,
  closeDatabase,
  clearDatabase,
};

export default mongoTest;

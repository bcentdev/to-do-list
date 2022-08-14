import mongoTest from 'config/database.config.test';

beforeAll(async () => {
  await mongoTest.connect();
});

afterEach(async () => {
  await mongoTest.clearDatabase();
});

afterAll(async () => {
  await mongoTest.closeDatabase();
});

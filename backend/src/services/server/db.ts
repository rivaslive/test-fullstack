import { Sequelize } from '@sequelize/core';
import getConfig from '../../config';

const { database } = getConfig;

export const db = new Sequelize(database.uri, {
  ...database?.options,
});

const initializeDB = async () => {
  try {
    await db.authenticate();
    console.log('Database connection has been established successfully.');
    return db;
  } catch (error) {
    console.log('***** Database failed connection *****');
    console.error(error);
    return null;
  }
};

export default initializeDB;

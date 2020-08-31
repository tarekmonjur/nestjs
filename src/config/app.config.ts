import { database } from './database.config';

export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: database()
});
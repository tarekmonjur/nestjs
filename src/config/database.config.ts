
export const database = (): any => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3307,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    "/src/**/*.entity.ts",
    "dist/**/*.entity.js",
  ],
  migrationsTableName: "migrations",
  migrations: [
    "dist/migrations/*.js",
  ],
  cli: {
    "migrationsDir": "dist/migrations"
  },
  synchronize: true,
  logging: true,
});
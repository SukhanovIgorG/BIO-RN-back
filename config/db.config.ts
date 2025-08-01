const PORT = process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432;

export const DB_CONFIG = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true, // ❗️Выключить на проде
};

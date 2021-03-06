import Sequelize from 'sequelize';

import databaseConfig from '#config/postgresDB/postgres-config.js';

import ExampleModel from '#models/ExampleModel.js';

class PostgresConnect {
  constructor() {
    const models = [ExampleModel];
    const connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(connection));
  }
}

export default new PostgresConnect();

import "reflect-metadata";
import { Employee } from "../src/entity/employee";
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options : DataSourceOptions & SeederOptions = {
  "type": "sqlite",
  "database": `src/db/${process.env.NODE_ENV}.sqlite`,
  "entities": [
    "src/entity/*{.ts,.js}"
  ],
  "migrations": [
    "src/db/migration/*{.ts,.js}"
  ],
  "seeds": [`src/db/seeds/employee.${process.env.NODE_ENV}.ts`],
  // "factories": ['src/db/factories/*{.ts,.js}']
};

export const connectionSource = new DataSource(options);

// (async () => {
//   await connectionSource.initialize();
//   await runSeeders(connectionSource);
// })();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const options = {
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
exports.connectionSource = new typeorm_1.DataSource(options);
// (async () => {
//   await connectionSource.initialize();
//   await runSeeders(connectionSource);
// })();
//# sourceMappingURL=ormconfig.js.map
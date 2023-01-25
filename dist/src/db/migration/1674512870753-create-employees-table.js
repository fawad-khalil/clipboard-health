"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeesTable1674512870753 = void 0;
const typeorm_1 = require("typeorm");
class createEmployeesTable1674512870753 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'employee',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'salary',
                        type: 'varchar',
                    },
                    {
                        name: 'currency',
                        type: 'varchar',
                    },
                    {
                        name: 'department',
                        type: 'varchar',
                    },
                    {
                        name: 'sub_department',
                        type: 'varchar',
                    },
                    {
                        name: 'on_contract',
                        isNullable: true,
                        type: 'varchar',
                    },
                    {
                        name: 'deleted_at',
                        type: 'datetime',
                        isNullable: true,
                    }
                ],
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('employee');
        });
    }
}
exports.createEmployeesTable1674512870753 = createEmployeesTable1674512870753;
//# sourceMappingURL=1674512870753-create-employees-table.js.map
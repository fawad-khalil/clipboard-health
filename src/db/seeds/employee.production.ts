import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Employee } from "../../entity/employee";

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        _factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(Employee);
        await repository.insert([
          
        ]);
    }
}

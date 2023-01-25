import { Repository } from 'typeorm';

export async function getStatistics(op: {repository: Repository<any>, tableName: string, fieldName: string, filters?: Array<{field:string, operator:string, value: any}>, groupBy?: string, columns?: string}) {
  const columnsSelect = op.columns ? `${op.columns},` : '';
  let query = `SELECT ${columnsSelect} AVG(${op.fieldName}) as mean, MIN(${op.fieldName}) as min, MAX(${op.fieldName}) as max FROM ${op.tableName}`
    
    if (op.filters && op.filters.length>0) {
      query += ` WHERE 1 = 1`;
      op.filters.forEach(filter => {
          query += ` AND ${filter.field} ${filter.operator} '${filter.value}'`;
      });
    }

    if (op.groupBy) {
      query += ` GROUP BY ${op.groupBy}`;
    }

    const statistics = await op.repository.query(query);
    
    return statistics;
}

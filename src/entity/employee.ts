import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Validate } from "class-validator";
import * as Joi from "@hapi/joi";

export const joiSchema: Joi.ObjectSchema<any> = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  salary: Joi.string().min(2).max(50).required(),
  currency: Joi.string().min(2).max(50).required(),
  department: Joi.string().min(2).max(50).required(),
  sub_department: Joi.string().min(2).max(50).required(),
  on_contract: Joi.string().allow("").optional(),
});

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  salary: string;

  @Column("varchar")
  currency: string;

  @Column("varchar")
  department: string;

  @Column("varchar")
  sub_department: string;

  @Column("varchar", { nullable: true })
  on_contract: string;

  @Column("datetime", { nullable: true })
  deleted_at: Date;
}

import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Checklist from "./checklist.entity";
import Survey from "./survey.entity";

@Entity()
export default class Equipment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_equipment!: number;

    @Column()
    description!: string;

    @Column()
    model!: string;

    @Column()
    category!: string;

    @Column()
    id_user!: number;

    @OneToMany(() => Checklist, checklist => checklist.equipment)
    checklist!: Checklist[];

    @ManyToOne(() => Survey, survey => survey.equipment)
    survey!: Survey;




























}
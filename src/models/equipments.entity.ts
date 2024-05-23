import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Checklist from "./checklist.entity";




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

    @OneToMany(() => Checklist, checklist => checklist.equipment)
    checklist!: Checklist[];
























}
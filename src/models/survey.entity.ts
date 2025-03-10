import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import ItemSurvey from "./item_survey.entity";
import Equipment from "./equipments.entity";


@Entity()
export default class Survey extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_survey!: number;

    @Column()
    description!: string;

    @Column()
    date_start!: string;

    @Column()
    date_end!: string;

    @ManyToOne(() => User, user => user.survey)
    user?: User[];

    @ManyToOne(() => Equipment, equipment => equipment.survey)
    equipment!: Equipment;

    @OneToMany(() => ItemSurvey, item_survey => item_survey.survey)
    item_survey?: ItemSurvey[];




}
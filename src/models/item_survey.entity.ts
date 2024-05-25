import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Survey from "./survey.entity";
import Evidence from "./evidence.entity";

@Entity()
export default class ItemSurvey extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_item_survey!: number;

    @Column()
    observation!: string;

    @Column()
    status!: boolean;

    @ManyToOne(() => Survey, survey => survey.item_survey)
    survey!: Survey;

    @OneToMany(() => Evidence, evidence => evidence.item_survey)
    evidence?: Evidence[];

}
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ItemSurvey from "./item_survey.entity";


@Entity()
export default class Evidence extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_evidence!: number;

    @Column()
    photo!: string;

    @Column()
    description!: string;

    @ManyToOne(() => ItemSurvey, ItemSurvey => ItemSurvey.evidence)
    item_survey!: ItemSurvey;



}
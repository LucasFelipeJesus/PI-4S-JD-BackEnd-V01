import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ItemSurvey from "./item_survey.entity";


@Entity()
export default class Evidence extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_evidence!: number;

    @Column()
    photo!: String

    @Column({ nullable: true })
    description!: string;

    @Column()
    id_user!: number;

    @ManyToOne(() => ItemSurvey, ItemSurvey => ItemSurvey.evidence)
    item_survey!: ItemSurvey;



}
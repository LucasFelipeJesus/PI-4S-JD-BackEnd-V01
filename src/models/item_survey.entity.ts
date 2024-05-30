import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Survey from "./survey.entity";
import Evidence from "./evidence.entity";
import Item_Checklist from "./item_checklist.entity";

@Entity()
export default class ItemSurvey extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_item_survey!: number;

    @Column()
    description!: string;

    @Column()
    status!: boolean;

    @ManyToOne(() => Survey, survey => survey.item_survey)
    survey?: Survey;

    @OneToMany(() => Evidence, evidence => evidence.item_survey)
    evidence?: Evidence[];

    @OneToMany(() => Item_Checklist, item_checklist => item_checklist.item_survey)
    item_checklist?: Item_Checklist;




}
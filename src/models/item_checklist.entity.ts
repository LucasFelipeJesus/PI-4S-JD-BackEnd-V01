import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Checklist from "./checklist.entity";
import ItemSurvey from "./item_survey.entity";

@Entity()
export default class Item_Checklist extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_item_checklist!: number;

    @Column()
    description!: string;

    @ManyToOne(() => Checklist, checklist => checklist.item_checklist)
    checklist!: Checklist;

    @ManyToOne(() => ItemSurvey, item_survey => item_survey.item_checklist)
    item_survey!: ItemSurvey;
}




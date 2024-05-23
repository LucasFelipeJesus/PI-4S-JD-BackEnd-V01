import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Checklist from "./checklist.entity";

@Entity()
export default class Item_Checklist extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_item_checklist!: number;

    @Column()
    description!: string;


    @ManyToOne(() => Checklist, checklist => checklist.item_checklist)
    checklist!: Checklist;







}




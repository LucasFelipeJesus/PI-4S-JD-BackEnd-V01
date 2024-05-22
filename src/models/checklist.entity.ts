import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Item_Checklist from "./item_checklist.entity";
import Equipment from "./equipments.entity";



@Entity()
export default class Checklist extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_checklist!: number;

    @Column()
    description!: string;

    @OneToMany(() => Equipment, equipment => equipment.checklist)
    equipments?: Equipment[];

    @ManyToOne(() => Item_Checklist, item_checklist => item_checklist.checklists)
    item_checklist?: Item_Checklist;



























}

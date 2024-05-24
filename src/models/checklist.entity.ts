import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Item_Checklist from "./item_checklist.entity";
import Equipment from "./equipments.entity";



@Entity()
export default class Checklist extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_checklist!: number;

    @Column()
    description!: string;

    @Column()
    id_user!: number;

    @OneToMany(() => Item_Checklist, item_checklist => item_checklist.checklist)
    item_checklist!: Item_Checklist[];

    @ManyToOne(() => Equipment, equipment => equipment.checklist)
    equipment!: Equipment;





























}

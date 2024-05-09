import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Equipments from "./equipments.entity";

@Entity()
export default class item_Equipment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_item_equipment!: number;

    @Column()
    description!: string;

    @Column()
    code!: string;

    @Column()
    Equipment_id!: number;

    @ManyToOne(() => Equipments, equipment => equipment.item_equipments)
    equipments!: Equipments;



}
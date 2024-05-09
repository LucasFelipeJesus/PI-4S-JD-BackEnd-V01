import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Equipments from "./equipments.entity";

@Entity()
export default class item_Equipment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_item_equipment!: number;

    @Column()
    description!: string;

    @Column()
    code!: string;

    @ManyToMany(() => Equipments, equipments => equipments.id_equipment)
    equipments!: Equipments[];



}
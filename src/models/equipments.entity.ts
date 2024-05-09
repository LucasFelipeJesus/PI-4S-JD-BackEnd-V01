import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import item_Equipment from "./item_equipment.entity";


@Entity()
export default class Equipments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_equipment!: number;

    @Column()
    description!: string;

    @Column()
    model!: string;

    @Column()
    category!: string;

    @Column()
    item_equipment_id!: number;

    @ManyToMany(() => item_Equipment, item_equipment => item_equipment.id_item_equipment)
    item_equipment!: item_Equipment[];

}
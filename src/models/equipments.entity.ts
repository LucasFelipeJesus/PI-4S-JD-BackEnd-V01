import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import item_Equipment from "./item_equipment.entity";


@Entity()
export default class Equipment extends BaseEntity {
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

    @ManyToOne(() => item_Equipment, item_equipment => item_equipment.equipments)
    item_equipments!: item_Equipment[];

}
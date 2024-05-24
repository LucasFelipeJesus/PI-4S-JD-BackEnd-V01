import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity()
export default class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_token!: number;

    @Column()
    token!: string;

    @Column()
    refreshToken!: string;

    @Column()
    expire_date!: Date;

    @Column()
    id_user!: number;

    @ManyToOne(() => User, user => user.token)
    user!: User;

}



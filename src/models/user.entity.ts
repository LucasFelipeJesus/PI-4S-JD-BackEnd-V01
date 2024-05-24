import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import Token from "./token.entity";
import Survey from "./survey.entity";

@Entity()
@Unique(['email'])
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_user!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => Token, token => token.user)
    token?: Token[];

    @ManyToOne(() => Survey, survey => survey.user)
    survey?: Survey;





}
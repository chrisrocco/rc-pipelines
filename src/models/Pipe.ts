import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Pipe {

    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    event: string

    @Column('varchar')
    digest: string

}
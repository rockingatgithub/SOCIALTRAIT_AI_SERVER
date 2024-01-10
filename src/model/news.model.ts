import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class News {

    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    postedTime: string;

}
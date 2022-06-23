import { Author as IAuthor } from '../../../models/author.model';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Book } from "../../books/entities/book.entity";

@Entity()
export class Author implements IAuthor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('date')
    dateOfBirth: Date;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}

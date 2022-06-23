import { Book as IBook } from '../../../models/book.model';
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Author } from "../../authors/entities/author.entity";


@Entity()
export class Book implements IBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('date')
    releaseDate: Date;

    @ManyToOne(() => Author, (author) => author.books)
    author: Author;
}

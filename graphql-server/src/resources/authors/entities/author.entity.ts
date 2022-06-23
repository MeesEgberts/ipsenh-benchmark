import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from "../../books/entities/book.entity";
import { Author as IAuthor } from "../../../models/author.model";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
@ObjectType()
export class Author implements IAuthor {

  @PrimaryGeneratedColumn()
  @Field(() => String, { description: 'The id of the author' })
  id: number;

  @Column()
  @Field(() => String, { description: 'The name of the author' })
  name: string;

  @Column('date')
  @Field(() => Date, { description: 'The date of birth' })
  dateOfBirth: Date;

  @OneToMany(() => Book, (book) => book.author)
  @Field(() => [Book], { description: 'All the books of the author' })
  books: Book[];
}

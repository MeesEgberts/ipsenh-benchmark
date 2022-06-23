import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Author} from "../../authors/entities/author.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
@ObjectType()
export class Book {

  @PrimaryGeneratedColumn()
  @Field(() => String, { description: 'The id of the book' })
  id: number;

  @Column()
  @Field(() => String, { description: 'The title of the book' })
  title: string;

  @Column('date')
  @Field(() => Date, { description: 'The release date of the book' })
  releaseDate: Date;

  @ManyToOne(() => Author, (author) => author.books)
  @Field(() => Author, { description: 'The author of the book' })
  author: Author;
}

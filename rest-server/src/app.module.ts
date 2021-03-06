import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksModule } from './resources/books/books.module';
import { AuthorsModule } from './resources/authors/authors.module';
import { Book } from "./resources/books/entities/book.entity";
import { Author } from "./resources/authors/entities/author.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../results.db',
      entities: [Book, Author],
      autoLoadEntities: true,
      synchronize: true
    }),
    BooksModule,
    AuthorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

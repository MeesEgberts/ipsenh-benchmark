import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./entities/book.entity";
import {Repository} from "typeorm";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  create(createBookInput: CreateBookInput) {
    return 'This action adds a new book';
  }

  findAll() {
    return this.bookRepository.find({
      relations: [ 'author' ]
    });
  }

  findOne(id: number) {
    return this.bookRepository.findOne({
      where: {
        id,
      },
      relations: [ 'author' ]
    })
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}

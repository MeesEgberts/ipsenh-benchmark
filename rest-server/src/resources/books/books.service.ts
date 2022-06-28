import {Injectable} from '@nestjs/common';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Book} from "./entities/book.entity";
import {Repository} from "typeorm";

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ) {}

    create(createBookDto: CreateBookDto) {
        return 'This action adds a new book';
    }

    findAll() {
        return this.bookRepository.find({
            loadRelationIds: true
        });
    }

    findOne(id: number) {
        return this.bookRepository.findOne({
            where: {
                id,
            },
            loadRelationIds: true
        })
    }

    update(id: number, updateBookDto: UpdateBookDto) {
        return `This action updates a #${id} book`;
    }

    remove(id: number) {
        return `This action removes a #${id} book`;
    }
}

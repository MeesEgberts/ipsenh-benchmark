import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Author} from "./entities/author.entity";
import {Repository} from "typeorm";

@Injectable()
export class AuthorsService {
  constructor(
      @InjectRepository(Author)
      private readonly authorRepository: Repository<Author>
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    return 'This action adds a new author';
  }

  findAll() {
    return this.authorRepository.find()
  }

  findOne(id: number) {
    return this.authorRepository.findOne({
      where: {
        id
      },
    })
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}

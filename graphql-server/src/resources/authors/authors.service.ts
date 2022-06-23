import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { InjectRepository } from "@nestjs/typeorm";
import { Author } from "./entities/author.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthorsService {
  constructor(
      @InjectRepository(Author)
      private readonly authorRepository: Repository<Author>
  ) {}

  create(createAuthorInput: CreateAuthorInput) {
    return 'This action adds a new author';
  }

  findAll() {
    return this.authorRepository.find({
      relations: ['books']
    })
  }

  findOne(id: number) {
    return this.authorRepository.findOne({
      where: {
        id
      },
      relations: ['books']
    })
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}

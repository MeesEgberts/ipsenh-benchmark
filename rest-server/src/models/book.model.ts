import { Author } from "../resources/authors/entities/author.entity";

export interface Book {
    title: string;
    releaseDate: Date;
    author: Author;
}

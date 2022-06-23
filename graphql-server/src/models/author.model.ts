import {Book} from "./book.model";

export interface Author {
    name: string;
    dateOfBirth: Date;
    books: Book[];
}
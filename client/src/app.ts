import axios from "axios";
import { Database, open } from 'sqlite'
import sqlite3 from 'sqlite3'

const REST_BOOK_URL = `http://localhost:3000/books`;
const REST_AUTHOR_URL = `http://localhost:3000/authors`;
const GRAPHQL = `http://localhost:9000/graphql`;
const ITERATIONS = 50;

enum QueryType {
    REST_SIMPLE,
    GRAPHQL_SIMPLE,
    REST_COMPLEX   ,
    GRAPHQL_COMPLEX
}

interface Result {
    type: QueryType;
    value: number;
}

const queryRest = (url: string): Promise<number> => {
    return new Promise(async (resolve) => {
        const start = process.hrtime.bigint();
        const response = await axios.get(url);
        const end = process.hrtime.bigint();
        resolve(Number(end - start) / 10 ** 6);
    })
}

const queryGraphql = (query: string): Promise<number> => {
    return new Promise(async (resolve) => {
        const start = process.hrtime.bigint();
        const response = await axios.post(GRAPHQL, {query});
        const end = process.hrtime.bigint();

        resolve(Number(end - start) / 10 ** 6);
    });
}

const complexRestQuery = (): Promise<number> => {
    return new Promise(async (resolve) => {
        const start = process.hrtime.bigint();
        const { data } = await axios.get(`${REST_BOOK_URL}/1`);
        const author = await axios.get(`${REST_AUTHOR_URL}/${data.author}`)
        const end = process.hrtime.bigint();

        resolve(Number(end - start) / 10 ** 6);
    })
}

const run = (): Promise<Result[]> => {
    return new Promise(async (resolve) => {
        const results: Result[] = [];

        for (let i = 0; i < ITERATIONS; i++) {
            const simpleRestResult = await queryRest(REST_BOOK_URL);
            results.push({ type: QueryType.REST_SIMPLE, value: simpleRestResult });

            const simpleGraphqlResult = await queryGraphql(`
{
  books {
    id
    title
    releaseDate
  }
}
`);
            results.push({ type: QueryType.GRAPHQL_SIMPLE, value: simpleGraphqlResult });

            const complexRetResult = await complexRestQuery();
            results.push({ type: QueryType.REST_COMPLEX, value: complexRetResult });

            const complexGraphqlResult = await queryGraphql(`
{
  books {
    id
    title
    releaseDate
    author {
      id
      name
      dateOfBirth
    }
  }
}
`);
            results.push({ type: QueryType.GRAPHQL_COMPLEX, value: complexGraphqlResult });
        }

        resolve(results);
    });
}

const showResults = async (db: Database) => {
    const graphqlAVG = await db.get("SELECT avg(`responseTime`) AS `avg` FROM `results` WHERE type = ?", [QueryType.GRAPHQL_SIMPLE]);
    const restAVG = await db.get("SELECT avg(`responseTime`) AS `avg` FROM `results` WHERE type = ?", [QueryType.REST_SIMPLE]);

    console.log(`graphql average: ${JSON.stringify(graphqlAVG)}`);
    console.log(`rest average: ${JSON.stringify(restAVG)}`);
}

const saveResponseTime = async (result: Result, db: Database) => {
    await db.run("INSERT INTO `results` (`type`, `responseTime`) VALUES (?, ?)", [result.type, result.value])
}

open({
    filename: '../results.db',
    driver: sqlite3.Database
}).then(async (db) => {
    const results = await run();

    results.forEach((result) => {
        saveResponseTime(result, db);
    });

    await showResults(db);
})
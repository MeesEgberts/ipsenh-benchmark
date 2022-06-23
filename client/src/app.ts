import axios from "axios";
import { request } from "graphql-request";

const REST_URL = `http://localhost:3000/books`;
const GRAPHQL = `http://localhost:9000/graphql`;

const queryRest = async () => {
    const start = +new Date();
    const response = await axios.get(REST_URL);
    const end = +new Date();

    console.log(`${end - start} ms`);
}

const queryGraphql = async () => {
    const start = +new Date();
    const response = await request(GRAPHQL, `
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
    const end = +new Date();

    console.log(`${end - start} ms`);
}

queryGraphql();
queryRest();
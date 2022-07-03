import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
import typeDefs from '../../db/schema';
import resolvers from '../../db/resolvers';
import connectDb from '../../db/config';

// import { createContext } from "graphql/context";

connectDb();


export const config = {
    api: {
        bodyParser: false,
    },
};

// const schema = gql`
//   type Query {
//     hello: String!
//   }
// `;
//
// const resolvers = {
//     Query: {
//         hello: (_parent, _args, _context) => "world!"
//     }
// }
//


const cors = Cors({
    allowMethods:  ["POST",  "OPTIONS"]
});

const server = new ApolloServer({
    // context: createContext,
    // schema,
    typeDefs,
    resolvers,
    context: () => {
        return {}
    }
});

const startServer = server.start();

export default cors(async (req, res) => {
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }


    await startServer;
    await server.createHandler({ path: "/api/graphql" })(req, res);
});


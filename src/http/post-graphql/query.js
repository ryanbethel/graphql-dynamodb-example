const arc = require("@architect/functions");
const { graphql } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");
const fs = require("fs");
const path = require("path");

// 1. read resolvers
const { resolverMap } = require("./resolvers");

// 2. read the schema
const typeDefs = fs.readFileSync(path.join(__dirname, ".", "schema.graphql")).toString();

// 3. combine resolvers and schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers: resolverMap,
});

module.exports = async function query({ body }) {
    const db = await arc.tables();
    const context = { db };
    try {
        const result = await graphql(schema, body.query, {}, context, body.variables, body.operationName);
        return {
            json: result,
        };
    } catch (e) {
        return {
            json: { error: e.name, message: e.message, stack: e.stack },
        };
    }
};

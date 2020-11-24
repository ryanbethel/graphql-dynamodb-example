const arc = require("@architect/functions");
const { graphql } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { applyMiddleware } = require("graphql-middleware");
const { shield, allow } = require("graphql-shield");

const shieldPermissions = shield({ Query: { "*": allow } }, { fallbackRule: allow, debug: true });

const fs = require("fs");
const path = require("path");

// 1. read resolvers
const { resolverMap } = require("./resolvers");

// 2. read the schema
const typeDefs = fs.readFileSync(path.join(__dirname, ".", "schema.graphql")).toString();

// 3. combine resolvers and schema

const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs,
        resolvers: resolverMap,
    }),
    shieldPermissions
);

/** graphql middleware */
module.exports = async function query({ body, session }) {
    const db = await arc.tables();
    const context = { session, db };
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

const lambdaPlayground = require("graphql-playground-middleware-lambda").default;

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
    function callbackFilter(error, output) {
        // eslint-disable-next-line no-param-reassign
        output.headers["Access-Control-Allow-Origin"] = "*";
        callback(error, output);
    }

    const handler = graphqlLambda({ schema: myGraphQLSchema });
    return handler(event, context, callbackFilter);
};

exports.handler = lambdaPlayground({
    endpoint: "/graphql",
});

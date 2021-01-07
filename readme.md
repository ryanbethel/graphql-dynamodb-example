# DynamoDB and GraphQL together

This is an example GraphQL API that is backed by DynamoDB and will deploy to AWS serverless technology. For a more detailed explanation of the code see the blog post on [css-tricks](https://css-tricks.com/how-to-make-graphql-and-dynamodb-play-nicely-together/).

## Getting Started

1. Clone the repository.
    ```
    git clone https://github.com/rbethel/graphql-dynamodb-example.git
    ```
2. Install Dependencies.
    ```
    npm install
    ```
3. Create your preferences file for seeding local data.
    ```
    cp preferences.arc.example preferences.arc
    ```
4. Start the development sandbox.
    ```
    npx arc sandbox
    ```
5. Navigate to the graphiQL playground
    ```
    http://localhost:3333/graphql
    ```

## Architect Framework

This project uses the Architect Framework ([arc.codes](arc.codes)) to build serverless web apps that deploy to AWS. This is an Infrastructure-as-Code open source project that makes working with AWS much easier.

## Local Development

The best part of Architect is that all the infrastructure that it deploys can be easily run in local development using the built in sandbox. This includes DynamoDB tables. There is a small script in the `sandbox-scripts` folder that will seed the local database with development data when you run the local development server.

## Deployment

To deploy to AWS only requires a single command. You do need an AWS account. Follow the instructions in the [arc.codes](arc.codes) docs to setup.

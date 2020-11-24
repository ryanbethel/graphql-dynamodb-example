@app
gql-ddb-example

@http
post /graphql
get /graphql

@tables
singletable
  pk *String
  sk **String

@indexes
singletable
  gsi1pk *String
  gsi1sk **String
singletable
  gsi2pk *String
  gsi2sk **String

@aws
region us-east-1
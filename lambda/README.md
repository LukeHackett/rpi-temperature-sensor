# RPi Temperature Sensor Lambda

To install serverless

```shell
$ npm install -g serverless
```

To install the project dependencies

```shell
$ npm install
$ serverless dynamodb install
```

To start the development server

```shell
$ npm run server
```

To deploy the project to AWS

```shell
$ serverless config credentials --provider aws --key AWS_KEY --secret AWS_SECRET
$ serverless deploy
```
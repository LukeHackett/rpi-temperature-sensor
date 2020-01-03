# RPi Temperature Sensor Lambda

To install the project dependencies

```shell
$ npm install
$ npm run dynamodb:install
```

To start the development server

```shell
$ npm start
```

To deploy the project to AWS

```shell
$ npm run sls -- config credentials --provider aws --key AWS_KEY --secret AWS_SECRET
$ npm run deploy:dev                # for a dev stack
$ npm run deploy:production         # for a production stack
```
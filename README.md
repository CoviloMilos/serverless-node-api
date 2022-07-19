<!--
title: 'Serverless Framework Node Express API on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node API on AWS

### Deployment

Install dependencies with:

```
npm install
```

Run with:

```
npm start
```

and then deploy with:

```
serverless deploy
```

or one function

```
serverless deploy function -f <functionName>
```

After running deploy, you should see output similar to:

```bash
Deploying serverless-demo to stage dev (us-east-1)

✔ Service deployed to stack serverless-demo-dev (196s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: serverless-demo-dev-api (766 kB)
```
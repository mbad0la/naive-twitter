## Getting Started :nut_and_bolt:

### Install node 

This application supports Node >= v10.x.x. Please download a relevant version from [here](https://github.com/nodesource/distributions).

I would highly recommend to setup [nvm](https://github.com/nvm-sh/nvm).

### AWS setup

* Add "jwt-token-key" and "mongo-conn-string" keys to AWS Secrets Manager
  - `jwt-token-key` is used as the encryption key for your credentials on local storage.
  - `mongo-conn-string` is the connection string of your mongo cluster.

Read through [this](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) document to be able to connect to AWS resources from your local machine.

### MongoDB setup

Here are three ways to get this done :
* You can provision Mongo [on your local machine](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).
* Setup a sandbox on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* Use [AWS DocumentDB](https://aws.amazon.com/documentdb/faqs/) (with MongoDB compatibility)

PS : If you use DocumentDB, local testing might be a bit cumbersome as you can't connect to a cluster from outside of its VPC.

### Application Boot Steps 

Move into the directory where you'd like to manage this project.

```
git clone https://github.com/mbad0la/naive-twitter.git

cd naive-twitter

npm i

npm run build

npm start
```

### :checkered_flag: Open `localhost` on your browser


## Troubleshooting
* After every change to client codebase, please run `npm run build` again.






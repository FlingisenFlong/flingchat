# Flingchat

https://chat.glowberry.xyz

# Flingchat Self-Hosting Guide

To self-host Flingchat, follow the steps below:

## 1. Clone the Repository

First, clone the Flingchat repository by running the following command:

```bash
git clone https://github.com/FlingisenFlong/flingchat.git
```
 ## 2. Navigate to the project directory
 ```bash
cd flingchat
```

## 3. Build the app

```bash
npm run build
```

## 4. Set up enviroment varibles

  1. rename the example.env to .env
  2. create an account at https://mongodb.com
  3. paste your uri in the .env
  4. change the port if you want
  5. generate a secret key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 5. Start the server
```bash
npm run start
```

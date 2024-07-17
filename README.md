# Getting Started

This project will be using corepack, turbo, and pm2 to run the project. 
These were chosen to speed up the development process and to ensure that the project is running as fast as possible.
Use the following commands to install the necessary packages and to start the project

install corepack
```bash
  corepack enable pnpm
```

install turbopack
```bash
npm install turbo --global
```
add .turbo to .gitignore

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

install pm2
```bash 
npm install pm2 -g
```
now you are ready to run the project
```bash
npm run start
```

 You can see that your app is running by running
```bash
  pm2 list
```
 To stop the app you can run 
```bash
  pm2 stop server
```

Create your jest test and them to the tests folder
To run your tests
```bash
npm run test
```

On push Husky will run the tests and the linter to ensure quality code is being deployed
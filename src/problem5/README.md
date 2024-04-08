# Diagram to illustrate the flow of execution


<div align="center">
  <img src="https://media.discordapp.net/attachments/797500480787185678/1226759777296580668/image.png?ex=6625f013&is=66137b13&hm=05467281a738040dc68c328efb4c8215ea464ce8a8b7ea827bec1a30c0a278c1&=&format=webp&quality=lossless&width=720&height=657" width="70%"/>
</div>

## Getting Started :memo:

## Step 1: Install Node.js and npm: Make sure you have Node.js and npm installed on your computer. You can download and install them from the official Node.js website.

## Step 2: Run npm i Command: Once you're in your project directory, you can use npm i to install dependencies specified in your project's package.json file.

```
# using npm
npm i

```

## Step 3: Run the Node.js server: Run the Node.js server with the following command:
```
# using npm
npm run start

```
## Step 4: Now you can open a browser and access http://localhost:3000 to see score broad 10 user have hight user's score.

## Step 5: Use postman to use API.

use api register account 
![image](https://github.com/kurousagi110/TrinhThaiHoa/assets/110773925/e6eee69b-4160-438e-9391-297b789af72a)


use api login and get token 

![image](https://github.com/kurousagi110/TrinhThaiHoa/assets/110773925/a4976ea4-7aa4-4f4b-b5e4-2be2f7fc2b64)

use token and update score 
![image](https://github.com/kurousagi110/TrinhThaiHoa/assets/110773925/e45ffe92-e175-430e-82c4-25cb9f0d3056)

![image](https://github.com/kurousagi110/TrinhThaiHoa/assets/110773925/711b5aff-0b0c-4e0b-a9ac-59b95d5a42b6)


I use authorization to secure the API and prevent unauthorized access. Without a token, users won't be able to update their scores.

Additional comments for improvement in the documentation:

* Consider adding a logging mechanism to track score update history. This will help in auditing and detecting any fraudulent activities.
* Review and enhance the authorization mechanism to ensure it aligns with best practices and provides adequate protection against unauthorized access.

## Thank for reading !!!


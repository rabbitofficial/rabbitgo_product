

<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/suency/rabbitgo_services/main/cms/public/logo_origin.png" alt="GengCMS" width="150">
  <br>
  <br>
  RabbitGo
  <br>
</h1>

<h4 align="center">A learn to earn platform based on Ton blockchain</h4>

<p align="center">
  <img src="https://badgen.net/badge/license/MIT/green" style="margin-right:-10px">
  <img src="https://badgen.net/badge/npm/8.19.2/blue" style="margin-right:-10px">
  <img src="https://badgen.net/badge/node/v16.18.0/blue" style="margin-right:-10px">
  <img src="https://badgen.net/badge/building/passed/green" style="margin-right:-10px">
  <img src="https://badgen.net/badge/chat/on%20Telegram/blue">
</p>

<p align="center">
  <a href="#About-RabbotGo">About RabbotGo</a> •
  <a href="#Tech-Overview">Tech Overview</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#ScreenShots">ScreenShots</a> •
  <a href="#How-to-use">How to use</a>
</p>

## About RabbotGo

* [RabbitGo.io](http://RabbitGo.io) is to grow Web3 creators and projects via Learn to Earn.

  a learn to earn platform for Web3 Creators looking to grow their communities and maximize their content capital. Our innovative Web3.0 infrastructure is designed to empower creators and provide them with the tools and resources they need to succeed.

  With [RabbitGo.io](http://RabbitGo.io), you can connect with your audience, share your work, and earn fair compensation for your efforts. Our interoperable social network and digital asset marketplace allow you to build and grow your community in a way that is fair, trustworthy, and inclusive.

  We understand the value of your content and the hard work that goes into creating it. That's why we're committed to providing a platform that recognizes and supports your efforts. Whether you're an artist, designer, influencer, or content creator, [RabbitGo.io](http://RabbitGo.io) is here to help you build and grow your community.

## Tech Overview

* There are four projects here following are explained for each
* Webapp:
  * Core project  is embened on telegram client and it can be visited via a telegram bot and  interacct with Ton Blockchain like earning RBT tokens via learning courses and get NFTs sometimes
* Webapp-api:
  * This is a backend service for webapp project which is written in Node.js and providing correspoinding services.
* Cms:
  * It is froent end part of a content management system which is for maintenance of webapp project. For example, we can monitor the data transactions daily and pulibish the new learning courses.
* Cms-api:
  * This is a backend service for Cms project which is written in Thinkphp framework which is similar to laravel php framework. It is very simple to create a backend service in MVC model.

## Key Features

* Users can earn points via attending courses via telegram webbapps

* Users can redeem points with real tokens which is on Ton Blockchain anytime

* Users can acquire NFTs if they satisfy certain conditions

* Users can do the quiz to test how they understand the knowledge and have the change to get the points

* ChatGPT system for users

* Zero Knowledge Proofs for users who would like to protect their data

  * Based on SNARK mechanism and interaction with AR storage smart contract and Ethreum smart contract
  * Currently it is under development 
  
* CMS features

  * Operations mangagers can monitor the daily activity data online, eg. daily transactions, new user registrations and points they redeem
  * Operations mangagers can publish new courses and daily news
  * Marketing department can use the data to do data analysis
  * Developers can dynamically add new menus on CMS systems
  * And access control system for different roles based rules defined by the admin
  * Export data for excel

* Dynamic router

  - The menu is generated based on the data on database
  - Access control for different roles

  

## ScreenShots

Web app screenshots below:

<div>
  <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/7.jpeg width=320>
    <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/6.jpeg width=320>
  <br/>
  <br/>
      <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/5.jpeg width=320>
      <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/4.jpeg width=320>
  <br/>
  <br/>
      <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/3.jpeg width=320>
      <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/2.jpeg width=320>
  </div>



CMS screenshots below:

<div>
  <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/c1.png >
  <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/c2.png >
    <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/c3.png >
      <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/c4.png >
      <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/c5.png >
      <img src=https://raw.githubusercontent.com/suency/rabbitgo_services/main/screenshots/compress/c6.png >
  </div>

## How to use

* There are four projects, so you should deploy each separately.

  For webapp:

  ```bash
  
  # if you already cloned this project, ignore it
  git clone https://github.com/suency/rabbitgo_services.git # clone the whole project
  cd webapp #webapp directory
  npm install # install dependencies
  
  npm run dev # start this project
  ## you should configure your own server
  ```

  For webapp-api:

  ``` bash
  # if you already cloned this project, ignore it
  git clone https://github.com/suency/rabbitgo_services.git # clone the whole project
  cd webapp-api #webapp directory
  npm install # install dependencies
  
  npm run start # start this project
  npm run both # it will run the bot services and backend services concurrently
  ## also you should configure your own server, such as api and so on
  ```

  For cms:

  ```bash
  # if you already cloned this project, ignore it
  
  git clone https://github.com/suency/rabbitgo_services.git # clone the whole project
  cd cms #webapp directory
  npm install # install dependencies if error, you should switch node version 13.14
  
  npm run start # start this project
  
  ## also you should configure your own server, such as api and so on
  
  #If you fail to install: try to add
  #[url "https://"]
  #    insteadOf = git://
  #to your .gitconfig in you ~path, and also you should include package.json.lock which #makes specific version for all required modules. (due to network reasons)
  
  #Make sure you can compile everything, and no error appears.
  #The project is based on vue2 and many modules are old. There are no other methods to #make it be new because it is very difficult to convert vue2 to vue3.
  #Node version is v13.14.0, it's old.
  ```

  For cms-api:

  1. Use thinkphp 6 for its api interface, so it requires **php7.4** and **mysql** version is not limited.

  2. Host the public fold in you server, and more imortant is. You should configure nginx like this

     ``` nginx
     server {
         listen 8065;
         server_name localhost;
         location / {
             index  index.htm index.html index.php;
             if (!-e $request_filename) {
                rewrite  ^/(.*)$  /index.php/$1  last;
                break;
             }
         }
     
         location ~ \.php/?.*$ {
         		# you can configure your own cors...
             add_header Access-Control-Allow-Origin *;
             #add_header Access-Control-Allow-Methods GET,POST,OPTIONS;    
             #add_header Access-Control-Allow-Headers X-Requested-With;
             add_header 'Access-Control-Allow-Methods' *;
             add_header 'Access-Control-Allow-Credentials' 'true';
             add_header 'Access-Control-Allow-Headers' *;
         
             root        /project_path/public;
             fastcgi_pass   127.0.0.1:9000;
             fastcgi_index  index.php;
             include        fastcgi.conf;
             set $fastcgi_script_name2 $fastcgi_script_name;
             if ($fastcgi_script_name ~ "^(.+\.php)(/.+)$") {
                 set $fastcgi_script_name2 $1;
                 set $path_info $2;
             }
             fastcgi_param   PATH_INFO $path_info;
             fastcgi_param   SCRIPT_FILENAME   $document_root$fastcgi_script_name2;
             fastcgi_param   SCRIPT_NAME   $fastcgi_script_name2;
         }
         
         error_page   500 502 503 504  /50x.html;
         location = /50x.html {
             root   html;
         }
     }
     ```

     3. Configure you database: It's very easy. Just execute the sql file and change the database configuration in the backend configuration file. SQL file will be released later!
     4. Enjoy!

​	




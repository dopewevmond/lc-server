# lc-server

trying to build a server for real-time chat with ExpressJS and Socket.io

- serves as both a REST API and a socket server
- user information stored in mongodb
- socket io powers real-time one-on-one chats by creating rooms unique to every connected user
- messages are currently not persisted to the database so users will lose messages sent to them if they're offline
- set up a CI/CD using CodePipeline, CodeBuild and Elastic Beanstalk to automatically grab source code, build and deploy every time a commit is made to the master branch
- setup HTTPS to ensure communication using AWS Certificate Manager
- server deployed [here](https://www.nodesocket.software)
- react frontend found [here](https://github.com/dopewevmond/lc-client)


### potential features i might add
- persist messages for offline users to fetch when they come back online
- allow users to share images in chat and upload images for their avatars
- add a group chat feature
- show online status of a user

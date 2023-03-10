FROM node:14

COPY . /app
WORKDIR /app
RUN ls
RUN yarn
RUN yarn run build
EXPOSE 3000

CMD [ "yarn", "start" ]
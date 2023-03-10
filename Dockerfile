# Set the base image to use for this container
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn

# Build code
RUN yarn run build


# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will listen on
EXPOSE 3000

# Start the application when the container is run
CMD [ "yarn", "start" ]
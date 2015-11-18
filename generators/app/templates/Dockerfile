FROM node:0.12-onbuild

# Bundle app source
ADD . /app
WORKDIR /app

# Install app dependencies
RUN npm install

CMD ["npm", "start"]

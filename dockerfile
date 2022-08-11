# pull official base image
FROM node:14

# set working directory
WORKDIR /usr/app

# add `/usr/app/node_modules/.bin` to $PATH
ENV PATH /usr/app/node_modules/.bin:$PATH
ENV REACT_APP_MILIEU PROD
ENV GATEWAY_URL "http://panel-gateway.aleriaconsulting.eu:6000/graphql"

RUN npm install -g npm

# install app dependencies
COPY package*.json ./

RUN npm install
RUN npm install react-scripts@4.0.1 -g

# giving ownership to node user
RUN chown 1000:1000 /usr/app/node_modules

# add app
COPY . ./

EXPOSE 4000
# start app
CMD ["npm", "start"]
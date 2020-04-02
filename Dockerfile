# install substrate for docker demo

FROM node:latest

EXPOSE 8080

COPY . ./substrate
RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/j6k4m8/substrate-demos.git

RUN npm install -g http-server webpack

WORKDIR ./substrate-demos/add-and-remove-layer
RUN npm install ../../substrate
RUN webpack index.js bundle.js
CMD http-server .

# Use the official Node.js image as the base image
FROM node:21 AS builder

WORKDIR /home/api

COPY package*.json ./home/api/package.json

ADD . /home/api/

RUN npm install 

EXPOSE 3000


# get a base image
FROM alpine

# build instructions
RUN apk add --update gcc
RUN apk add --update redis

# run instructions
CMD [ "redis-server" ]
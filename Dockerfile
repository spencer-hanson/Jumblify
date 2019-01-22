FROM node
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/node_modules
COPY build/ /usr/src/app
COPY node_modules/ /usr/src/app/node_modules
EXPOSE 8888
CMD ["node", "/usr/src/app/index" ]

FROM node
MAINTAINER SHANG xinshangshangxin@gmail.com

# Build app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install --production

EXPOSE 1340
CMD [ "node","app.js"]

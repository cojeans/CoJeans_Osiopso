# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용.
#FROM nginx:stable-alpine

# root 에 app 폴더를 생성
#RUN mkdir /app

# work dir 고정
#WORKDIR /app

# work dir 에 build 폴더 생성 /app/build
#UN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
#ADD ./build ./build

# nginx 의 default.conf 를 삭제
#RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
#COPY ./nginx.conf /etc/nginx/conf.d

# 80 포트 오픈
#EXPOSE 3000

# container 실행 시 자동으로 실행할 command. nginx 시작함
#CMD ["nginx", "-g", "daemon off;"]

#FROM node:16.18.0-alpine

#RUN mkdir /app
#WORKDIR /app

#ENV PATH /app/node_modules/.bin:$PATH

#COPY . /app
#RUN npm install

#CMD ["npm", "start"]
###############################
# FROM nginx:stable-alpine

# WORKDIR /app

# RUN mkdir ./build

# ADD ./build ./build

# RUN rm /etc/nginx/conf.d/default.conf

# COPY ./nginx.conf /etc/nginx/conf.d

# EXPOSE 3000

# CMD [ "nginx","-g","daemon off;" ]

FROM node:14-alpine

#FROM node:16.18.0-alpine

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
RUN npm install

CMD ["npm", "start"]
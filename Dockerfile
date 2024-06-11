FROM node:21
WORKDIR /react
COPY . /react
RUN npm install
RUN npm run build
RUN mv /react/build/index.html /react/build/ui/index.html

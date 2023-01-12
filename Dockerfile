FROM node:latest
COPY src/ /app/
WORKDIR /app

RUN npm install -g yarn --force
RUN yarn install
EXPOSE 3000
CMD ["npm", "run", "start"]

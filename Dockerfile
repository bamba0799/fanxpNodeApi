FROM node:18-alpine

WORKDIR /var/www/can-2023

# Bundle app source
COPY . .

# Install dependencies
RUN yarn --frozen-lockfile

EXPOSE 3000

CMD [ "yarn", "start" ]
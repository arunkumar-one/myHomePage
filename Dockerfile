FROM node:lts-alpine3.19
COPY . .
ENV PORT=3000
EXPOSE 3000 3000
CMD ["node", "app.js"]


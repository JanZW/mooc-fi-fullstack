FROM node:24-bookworm-slim AS build

WORKDIR /src
COPY frontend/ .
RUN echo $(ls)
RUN npm i
RUN npm run build

FROM node:24-bookworm-slim

WORKDIR /src
COPY backend/ .
COPY --from=build /src/dist/ dist
RUN npm i
ENTRYPOINT ["npm", "run", "start"]
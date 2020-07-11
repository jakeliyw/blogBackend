FROM node

ARG NPM_REGISTRY=https://registry.npm.taobao.org

ADD . /blog-koa2

RUN yarn install --registry $NPM_REGISTRY

WORKDIR /blog-koa2

ENTRYPOINT ["./wait-for-it.sh", "db:3306", "--timeout=120", "--", "yarn", "run", "prd"]

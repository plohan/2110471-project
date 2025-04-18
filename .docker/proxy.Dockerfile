# syntax=docker/dockerfile:1
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY pnpm-lock.yaml pnpm-workspace.yaml /app/
COPY packages/ /app/packages/
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter=core build && pnpm --filter=web build

FROM nginx:1.27-bookworm AS prod

COPY --from=build /app/packages/web/out/ /usr/share/nginx/html

COPY .docker/default.conf /etc/nginx/conf.d/default.conf

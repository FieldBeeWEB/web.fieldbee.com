ARG VARIANT=18-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}
RUN apt-get install openssl procps -y
RUN corepack enable
RUN corepack prepare --activate pnpm@8.0.0
ENV PNPM_HOME=/usr/local/bin
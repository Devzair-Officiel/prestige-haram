# syntax=docker/dockerfile:1.7
#
# Cibles :
#   - development (défaut, utilisée par compose.yaml) : Vite dev server, HMR.
#   - build   : compile dist/ (npm ci + npm run build)
#   - production : nginx:alpine servant dist/ statique, fallback SPA.

# ---------- development ----------
FROM node:24-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ---------- build ----------
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- production ----------
FROM nginx:1.27-alpine AS production
COPY docker/nginx-security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

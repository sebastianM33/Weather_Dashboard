FROM node:20-alpine

WORKDIR /app 

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm && pnpm install

COPY . .

# Expone el puerto del front-end
EXPOSE 5173
 
# Enciende Vite habilitando la red para Docker (--host)
CMD ["pnpm", "dev", "--host"]
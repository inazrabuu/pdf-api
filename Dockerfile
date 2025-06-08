FROM node:20-bullseye

# Install minimal Chromium dependencies
RUN apt-get update && apt-get install -y \
  chromium \
  libnss3 \
  libatk-bridge2.0-0 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libasound2 \
  libpangocairo-1.0-0 \
  libgtk-3-0 \
  --no-install-recommends && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

  WORKDIR /app

  COPY . .

  RUN npm install

  EXPOSE 3000

  CMD ["npm", "start"]
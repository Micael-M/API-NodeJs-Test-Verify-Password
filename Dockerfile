FROM node:16.14.0

# Onde a aplicação ficará dentro do container
ENV HOME=/home/app

# Verifica se os package mudaram
COPY package*.json $HOME/password_strong_docker/

WORKDIR $HOME/password_strong_docker

# Otimiza o processo de intalação
# Se não houve mudanças nos packages, não executa 'npm install'
RUN npm install --silent --progress=false

COPY . $HOME/password_strong_docker

CMD ["npm", "start"]
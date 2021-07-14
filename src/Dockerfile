FROM node:14.15.4
RUN mkdir -p /usr/src/candidate-test
COPY build /usr/src/candidate-test/build/
COPY data.json /usr/src/candidate-test/
COPY server.js /usr/src/candidate-test/
COPY deploy-package.json /usr/src/candidate-test/package.json
WORKDIR /usr/src/candidate-test
RUN echo 'package-lock=false' >> .npmrc
RUN npm install
EXPOSE 4002
CMD ["node", "server.js"]
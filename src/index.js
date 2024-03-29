require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { errorHandler } = require("./middleware/error");
const v1PostRouter = require("./router/v1/postsRouters");
const v1AuthRouter = require("./router/v1/authRouters");
const morganMiddleware = require("./middleware/logger");
const logger = require("../utils/logConfig");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');


const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morganMiddleware);
server.use("/api/v1/auth", v1AuthRouter);
server.use("/api/v1/posts", v1PostRouter);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(errorHandler);

server.listen(PORT,  () => {
  logger.info(`Web service is running on port = ${PORT}`)
  // console.log(`Web service is running on port = ${PORT}`);
});

module.exports = server;
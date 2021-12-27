"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const database_1 = require("./database/database");
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const workspace_1 = __importDefault(require("./routes/workspace"));
const board_1 = __importDefault(require("./routes/board"));
const list_1 = __importDefault(require("./routes/list"));
const card_1 = __importDefault(require("./routes/card"));
dotenv.config({ path: "./.env" });
const SCHEME = process.env.SERVER_SCHEME;
const HOSTNAME = process.env.SERVER_HOSTNAME;
const PORT = process.env.SERVER_PORT;
const app = express_1.default();
database_1.connect();
app.use(cors_1.default({ origin: true, credentials: true })); //process.env.CLIENT_ORIGIN
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use("/", auth_1.default);
app.use("/workspace", workspace_1.default);
app.use("/board", board_1.default);
app.use("/list", list_1.default);
app.use("/card", card_1.default);
https_1.default
  .createServer(
    {
      key: fs_1.default.readFileSync(`${process.env.CERT_KEY_PATH}`),
      cert: fs_1.default.readFileSync(`${process.env.CERT_PATH}`),
    },
    app
  )
  .listen(PORT, () => {
    console.log(
      `[server]: Server is running at ${SCHEME}://${HOSTNAME}:${PORT}`
    );
  });
//# sourceMappingURL=index.js.map

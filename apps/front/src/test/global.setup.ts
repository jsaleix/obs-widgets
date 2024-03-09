import "crypto";
import "setimmediate";

import { randomUUID } from "node:crypto";

window.crypto.randomUUID = randomUUID;

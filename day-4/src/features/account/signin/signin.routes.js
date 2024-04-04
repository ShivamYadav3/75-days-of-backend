import { router } from "../../../../server.js";
import { signInValidator } from "./signin.validator.js";
import { signInUser } from "./signin.controller.js";

router.post("/", signInValidator, signInUser);

export default router;

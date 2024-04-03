import { router } from "../../../server.js";
import { signInUser } from "./signin.controller.js";

router.get("/", signInUser);

export default router;

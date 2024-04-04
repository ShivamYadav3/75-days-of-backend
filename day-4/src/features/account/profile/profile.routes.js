import { router } from "../../../../server.js";
import { getUserDetails } from "./profile.controller.js";
import { getProfileValidator } from "./profile.validator.js";

router.get("/", getProfileValidator, getUserDetails);

export default router;

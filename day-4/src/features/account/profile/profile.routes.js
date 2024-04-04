import { router } from "../../../../server.js";
import { getUserDetails } from "./profile.controller.js";

router.get("/", getUserDetails);

export default router;

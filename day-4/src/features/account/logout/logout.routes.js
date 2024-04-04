import { router } from "../../../../server.js";

router.get("/", (req, res) => {
  console.log("okk");
  res.cookie("user", "", { expires: new Date(0) });
  res.send("logout");
});

export default router;

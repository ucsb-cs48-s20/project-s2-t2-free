import auth0 from "./auth0";
import { attachUserMetadata } from "./user";
import { createUser } from "../pages/api/user";

export function authenticatedAction(actionFn) {
  return auth0.requireAuthentication(async function (req, res) {
    try {
      const { user } = await auth0.getSession(req);
      await attachUserMetadata(user);
      await createUser(user);

      const actionResult = await actionFn(req, user);

      res.statusCode = actionResult ? 200 : 204;
      res.end(JSON.stringify(actionResult));
    } catch (error) {
      console.error(error);
      res
        .status(error.status || 500)
        .end(error.message && JSON.stringify({ message: error.message }));
    }
  });
}

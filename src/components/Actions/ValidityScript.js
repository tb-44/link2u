import { userConstants } from "../constants";

export default function checkValidityRecruiter(context) {
  let expstamp = localStorage.getItem("token_expiry");
  let currentStamp = Math.floor(Date.now() / 1000);
  let role = localStorage.getItem("role");

  if (expstamp === null) {
    context.props.history.push("/recruitersignin");
  } else {
    if (role === null) {
      alert("Role Not Found");
      context.props.history.push("/recruitersignin");
    } else if (role === "A") {
      context.props.history.push("/notarecruiter");
    } else if (role === "AR" || role === "R") {
      if (expstamp > currentStamp) {
        return "AOK";
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token_expiry");
        localStorage.removeItem(userConstants.USER_DETAILS);
        localStorage.removeItem(userConstants.AUTH_TOKEN);
        context.props.history.push("/recruitersignin");
      }
    }
  }
}

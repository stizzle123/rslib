import cookie from "js-cookie";
import Router from "next/router";

var inADay = 1;
export function handleLogin(token) {
  cookie.set("token", token, { expires: inADay });
  Router.push("/account");
  // Router.push("/dashboard");
}

export function handleSignup() {
  Router.replace("/login");
}

export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

export function handleLogOut() {
  cookie.remove("token");
  Router.push("/login");
  window.localStorage.setItem("logout", Date.now());
}

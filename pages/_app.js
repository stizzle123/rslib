import React from "react";
import App from "next/app";
import Head from "next/head";
import theme from "../utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { parseCookies, destroyCookie } from "nookies";
import CssBaseline from "@material-ui/core/CssBaseline";
import { redirectUser } from "../utils/auth";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

export class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" ||
        ctx.pathname === "/create" ||
        ctx.pathname === "/profile" ||
        ctx.pathname === "/dashboard" ||
        ctx.pathname === "/books" ||
        ctx.pathname === "/books/add" ||
        ctx.pathname === "/bookcollections" ||
        ctx.pathname === "/book/edit" ||
        ctx.pathname === "/book/info" ||
        ctx.pathname === "/collection";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const collectionData = await axios.get(
          `${baseUrl}/api/collections`,
          payload
        );
        const user = response.data;
        const collections = collectionData.data;
        pageProps.user = user;
        pageProps.collections = collections;
        const isRoot = user.role === "root";
        const isAdmin = user.role === "admin";
        const isLoggedIn =
          (user && ctx.pathname === "/login") || ctx.pathname === "/signup";
        const isNotPermitted =
          !(isRoot || isAdmin) && ctx.pathname === "/create";
        if (isNotPermitted) {
          redirectUser(ctx, "/");
        }
        if (isLoggedIn) {
          redirectUser(ctx, "/");
        }
      } catch (error) {
        console.error("Error getting current user ", error);
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login");
      }
    }
    return { pageProps };
  }

  componentDidMount() {
    window.addEventListener("storage", this.syncLogout);
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.syncLogout);
    window.localStorage.removeItem("logout");
  }

  syncLogout = e => {
    if (e.key === "logout") {
      Router.push("/login");
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>RS Library</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;

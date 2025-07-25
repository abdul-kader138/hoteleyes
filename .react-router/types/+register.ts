import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/login": {};
  "/registration": {};
  "/forgot-password": {};
  "/reset-password/:token": {
    "token": string;
  };
  "/profile": {};
  "/dashboard": {};
  "/about": {};
  "/contact": {};
  "/games": {};
  "/news": {};
  "/services": {};
  "/game/:id": {
    "id": string;
  };
  "/blogs/:articleId": {
    "articleId": string;
  };
  "/*": {
    "*": string;
  };
};
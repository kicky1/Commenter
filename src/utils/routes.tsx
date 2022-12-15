import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
} from "react-router-dom";
import CommentPage from "../pages/CommentsPage/CommentPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <CommentPage/>,
  },
]);
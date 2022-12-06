import { Route, Routes } from "react-router-dom";

import Conversation from "../pages/Conversation";
import RouteNotFound from "../pages/RouteNotFound";
import Layout from "./Layout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="group">
          <Route path=":name" element={<Conversation />} />
        </Route>
        <Route path=":name" element={<Conversation group />} />
      </Route>
      <Route path="*" element={<RouteNotFound />} />
    </Routes>
  );
}

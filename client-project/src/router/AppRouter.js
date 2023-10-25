import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Users } from "../pages/admin";

export const AppRouter = () => {

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
            <>
              <Route index element={loadLayout(AdminLayout, Users)} />
        </>
    </Routes>
  );
};
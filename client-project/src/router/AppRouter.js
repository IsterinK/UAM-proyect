import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======

>>>>>>> b41330871669f520a9ca287eaddabae9c7000b4b
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
<<<<<<< HEAD
        <>
            <Route index element={loadLayout(AdminLayout, Users)} />
=======
            <>
              <Route index element={loadLayout(AdminLayout, Users)} />
>>>>>>> b41330871669f520a9ca287eaddabae9c7000b4b
        </>
    </Routes>
  );
};
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInView from './pages/users/Auth/LogInView';
import RegisterView from './pages/users/Auth/RegisterView';
import Users from '../src/pages/admin/users/Users';

import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter> 
        <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<LogInView />} />
        <Route path="signup" element={<RegisterView />} />
        <Route path="admin/users" element={<Users />} />
        </Routes>
    </BrowserRouter>
);


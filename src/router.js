import React, { Component }  from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import ProfileAcademic from "./pages/ProfileAcademic"
import Layout from "./components/Layout"
import AuthLayout from "./components/AuthLayout"
import Explore from "./pages/Explore"
import DocumentManagement from "./pages/DocumentManagement"
import UniversityDetails from "./pages/UniversityDetails"
import AppliedUniversities from "./pages/AppliedUniversities"
import ChatWithAgent from "./pages/ChatWithAgent"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore/:disciplineSlug?" element={<Explore />} />
            <Route path="/studies/:slug" element={<UniversityDetails />} />

            <Route element={<AuthLayout authentication={false} />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<AuthLayout authentication={true} />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/study-preferences" element={<ProfileAcademic />} />
                <Route path="/document-management" element={<DocumentManagement />} />
                <Route path="/applied-universities" element={<AppliedUniversities />} />
                <Route path="/agent-notification" element={<ChatWithAgent />} />
            </Route>
        </Route>
    ),
    // {basename: "/smart-steps",}
)

export default router;
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Announcements from "./pages/Announcements";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/announcements" replace />} />
        <Route path="announcements" element={<Announcements />} />
      </Route>
    </Routes>
  );
}
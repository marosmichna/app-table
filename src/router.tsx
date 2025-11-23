import { Routes, Route, Navigate } from "react-router-dom";
import MyTable from "./components/MyTable";
import MainLayout from "./layouts/MainLayout";
import AnnouncementDetail from "./components/AnnouncementDetail";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/announcements" replace />} />
        <Route path="announcements" element={<MyTable />} />
        <Route path="announcements/:id" element={<AnnouncementDetail />} />
      </Route>
    </Routes>
  );
}
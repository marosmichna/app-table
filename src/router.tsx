import { Routes, Route, Navigate } from "react-router-dom";
import MyTable from "./components/MyTable";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="/announcements" replace />} />
        <Route path="announcements" element={<MyTable />} />
      </Route>
    </Routes>
  );
}
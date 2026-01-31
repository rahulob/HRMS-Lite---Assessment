import { Toaster } from "sonner";
import CreateEmployee from "./pages/CreateEmployee";
import { BrowserRouter, Routes, Route } from "react-router";
import MarkAttendance from "./pages/MarkAttendance";
import { AppSidebar } from "./components/AppSidebar";

import { SidebarProvider } from "./components/ui/sidebar";
import ViewEmployees from "./pages/ViewEmployees";
import ViewAttendance from "./pages/ViewAttendance";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/view-employees" element={<ViewEmployees />} />
          <Route path="/mark-attendance" element={<MarkAttendance />} />
          <Route path="/view-attendance" element={<ViewAttendance />} />
        </Routes>
        <Toaster position="top-right" />
      </SidebarProvider>
    </BrowserRouter>
  )
}

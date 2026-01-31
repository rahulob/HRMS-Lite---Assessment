import { Toaster } from "sonner";
import CreateEmployee from "./pages/CreateEmployee";
import { BrowserRouter, Routes, Route } from "react-router";
import MarkAttendance from "./pages/MarkAttendance";
import { AppSidebar } from "./components/AppSidebar";

import { SidebarProvider } from "./components/ui/sidebar";
import ViewEmployees from "./pages/ViewEmployees";

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/view-employees" element={<ViewEmployees />} />
          <Route path="/mark-attendance" element={<MarkAttendance />} />
          <Route path="/view-attendance" element={<MarkAttendance />} />
        </Routes>
        <Toaster position="top-right" />
      </SidebarProvider>
    </BrowserRouter>
  )
}

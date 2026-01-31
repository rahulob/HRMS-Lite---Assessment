import { Toaster } from "sonner";
import { CreateEmployee } from "./pages/CreateEmployee";
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  )
}

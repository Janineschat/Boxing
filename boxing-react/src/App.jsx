import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Champions from "./pages/Champions";
import Titels from "./pages/Titels";
import UpcomingFights from "./pages/UpcomingFights";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champions" element={<Champions />} />
        <Route path="/titels" element={<Titels />} />
        <Route path="/upcoming-fights" element={<UpcomingFights />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BlogList from "./pages/BlogList";
import BlogReader from "./pages/BlogReader";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogReader />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import TodoPage from "./pages/TodoPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <h1>Week 2 React App</h1>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/todo">To-Do</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
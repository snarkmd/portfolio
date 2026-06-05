import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import WhoAmI from "./pages/WhoAmI";

// Task 1: declared the menu-backed routes so they no longer fall through to the wildcard page.
function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/whoami"
            element={
              <MainLayout>
                <WhoAmI />
              </MainLayout>
            }
          />
          <Route
            path="/blog"
            element={
              <MainLayout>
                <Blog />
              </MainLayout>
            }
          />
          <Route
            path="*"
            element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            }
          />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;

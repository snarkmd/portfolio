import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
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

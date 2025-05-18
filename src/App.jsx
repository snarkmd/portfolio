import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from 'react-helmet-async';
function App() {
  return (
    <Router>
      <HelmetProvider>
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
      </HelmetProvider>
    </Router>
  );
}

export default App;

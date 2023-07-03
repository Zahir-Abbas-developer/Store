import { useRoutes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorBoundary/ErrorBoundary";
import { routes } from "./routes";
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import "./App.css";

function App() {
  const pages = useRoutes(routes);
  
  return (
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="App">
          <Helmet>
            <title>Solace Leather</title>
            <meta name="description" content="Your website description" />
            {/* Other common meta tags */}
          </Helmet>
          {pages}
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;

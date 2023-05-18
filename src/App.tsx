import { useRoutes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorBoundary/ErrorBoundary";
import { routes } from "./routes";
import "./App.css";

function App() {
  const pages = useRoutes(routes);
  return (

  <ErrorBoundary FallbackComponent={ErrorFallback}>
  <div className="App">{pages}</div>;
  </ErrorBoundary>
  )

}

export default App;

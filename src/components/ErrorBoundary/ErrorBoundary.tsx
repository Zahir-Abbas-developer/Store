import { Link } from "react-router-dom";
import "./ErrorBoundary.scss";

export function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <>
      <div className="error-boundary">
        <div className="error-boundry-wrapper d-flex align-center justify-center flex-column">
          <h2 className="title-color fs-26 m-0 text-center">
            Oh no, Something <span className="primary-color">went wrong!</span>
          </h2>
          <p className="title-color fs-16 m-0 text-center d-block">
            So sorry, but our site is under maintenance right now. <br />
            We're doing our best and we'll back soon.
          </p>
          <Link
            to="/"
            className="bgSecondary-color text-white fs-18 fw-500 cursor-pointer"
            onClick={resetErrorBoundary}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export const myErrorHandler = (
  error: Error,
  info: { componentStack: string }
) => {};

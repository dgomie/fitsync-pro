import { useRouteError } from "react-router-dom";
import Nav from "../components/Nav";
import Layout from "../components/LayoutComponent";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page">
      <Layout>
        <Nav />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "120px",
          }}
        >
          <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
}

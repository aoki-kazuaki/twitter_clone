import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import AppHeaderMobile from "./components/organisms/App/Header/Mobile";
import { useIsMobile } from "./hooks/useIsMobile";
import { router } from "./router";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && (
        <>
          <AppHeaderMobile />
        </>
      )}
      <RouterProvider router={router} />
    </>
  );
}
export default App;

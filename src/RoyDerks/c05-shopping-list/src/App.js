import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import AppContext from "./context/AppContext";
// import { ItemsContextProvider } from "./context/ItemsContext";
// import { ListsContextProvider } from "./context/ListsContext";


const ListDetail = lazy(() => import("./pages/ListDetail"));
const ListForm = lazy(() => import("./pages/ListForm"));
const Lists = lazy(() => import("./pages/Lists"));

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <BrowserRouter>
          <Header />
          <Suspense fallback={<div>Loading ...</div>}>
            <AppContext>
              <Routes>
                <Route path='/' element={<Lists />} />
                <Route path='/list/:listId/new' element={<ListForm />} />
                <Route path='/list/:listId/' element={<ListDetail />} />
              </Routes>
            </AppContext>
          </Suspense>
        </BrowserRouter>
      </AppWrapper>
    </>
  );
}

export default App;

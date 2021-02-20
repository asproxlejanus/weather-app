import React, { useContext } from "react";
import styled from "styled-components";
import { Today } from "./routes/index";
import { AppContext, AppProvider } from "../components/context/app-context";
import { ThemeProvider } from "../assets/theme/theme-provider";

const AppContainer = styled.div`
  height: 100vh;
  margin: 15px auto;
  width: 100%;
  max-width: 600px;
  box-shadow: 0px 0px 15px 1px gainsboro;
  border-radius: 8px;
  padding: 15px;
`;

const SearchContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacingS};
`;

const Search = () => {
  const { state, setCity } = useContext(AppContext);
  console.log(state);
  return (
    <SearchContainer className="ui icon input">
      <input type="text" placeholder="Search..." />
      <i
        onClick={() => setCity("Barcelona")}
        className="inverted circular search link icon"
      />
    </SearchContainer>
  );
};

export const App = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContainer>
          <Search />
          <Today />
        </AppContainer>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;

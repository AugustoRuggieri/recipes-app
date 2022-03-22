import Category from "./components/Category";
import Pages from "./pages/Pages"
import Search from "./components/Search";
import { Link, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { HiHome } from "react-icons/hi"

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <StyledNav>
          <HiHome />
          <HomeButton to={"/"}>Home</HomeButton>
        </StyledNav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const HomeButton = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
`;

const StyledNav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 1.5rem;
  }
`;

export default App;

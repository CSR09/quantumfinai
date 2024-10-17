// File: src/components/Header.tsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #282c34;
  padding: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin: 0 15px;
  color: #61dafb;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <nav>
        <NavLink to="/">주식 예측</NavLink>
        <NavLink to="/measurement">측정 데이터</NavLink>
        <NavLink to="/test">테스트 페이지</NavLink>
      </nav>
    </HeaderContainer>
  );
};

export default Header;

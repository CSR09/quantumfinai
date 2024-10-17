import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #1e1e1e;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
  color: #61dafb;
`;

const LinksTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #2c2c2c;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #61dafb;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #2c2c2c;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #444;
`;

const StyledLink = styled(Link)`
  color: #61dafb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

interface Route {
  path: string;
  name: string;
  component: string;
}

const TestPage = () => {
  const routes: Route[] = [
    { path: "/", name: "홈", component: "StockPredictionPage" },
    { path: "/stock-prediction", name: "주식 예측", component: "StockPredictionPage" },
    { path: "/measurement", name: "측정 데이터", component: "MeasurementPage" },
    { path: "/test", name: "테스트 페이지", component: "TestPage" },
    { path: "*", name: "Not Found", component: "NotFoundPage" },
  ];

  return (
    <PageContainer>
      <Title>라우트 테스트 페이지</Title>
      <LinksTable>
        <thead>
          <tr>
            <TableHeader>경로</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>컴포넌트</TableHeader>
            <TableHeader>링크</TableHeader>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, index) => (
            <TableRow key={index}>
              <TableCell>{route.path}</TableCell>
              <TableCell>{route.name}</TableCell>
              <TableCell>{route.component}</TableCell>
              <TableCell>
                <StyledLink to={route.path}>이동</StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </LinksTable>
    </PageContainer>
  );
};

export default TestPage;
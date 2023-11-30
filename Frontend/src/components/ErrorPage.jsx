import { useRouteError } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 64px;
  font-weight: 600;
`;

const Desc = styled.p`
  font-size: 18px;
`;
const Status = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: tomato;
`;
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container>
      <Title>Oops!</Title>
      <Desc>Sorry, an unexpected error has occurred.</Desc>
      <Status>
        <i>{error.statusText || error.message}</i>
      </Status>
    </Container>
  );
}

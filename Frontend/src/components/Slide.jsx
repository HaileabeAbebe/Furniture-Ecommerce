import { styled } from "styled-components";

const Container = styled.div``;
const Image = styled.img``;

const Slide = ({ id, img, title, desc, bg }) => {
  return (
    <Container>
      <img src={img} alt="" />
      <h1>{title}</h1>
    </Container>
  );
};

export default Slide;

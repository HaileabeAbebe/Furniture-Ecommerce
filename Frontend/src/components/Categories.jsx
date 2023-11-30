// ImageGallery.js
import styled from "styled-components";
import { categoryData } from "../data"; // Import the image data
import { Link } from "react-router-dom";

const GalleryContainer = styled.div`
  width: 90%;
  margin: 100px auto;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  grid-row-gap: 20px;
`;

const ImageWrapper = styled.div`
  margin: 0px 10px;
  position: relative;

  .image {
    position: relative;
    overflow: hidden;

    img {
      width: 300px;
      height: 300px;
      display: block;
      transition: transform 0.3s ease-in-out;
      object-fit: cover;
    }

    a {
      display: inline-block;
      color: var(--main-color);
      text-transform: capitalize;
      text-decoration: none;
      position: relative;
      margin-top: 20px;

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background: var(--main-color);
        left: 0%;
        top: 23px;
        transform: scale(0);
        transition: 0.5s ease-in-out;
      }

      &:hover::before {
        transform: scale(1);
      }
    }

    &:hover img {
      transform: scale(1.05);
    }
  }
`;
const Title = styled.h1`
  font-size: 2.5em;
  color: #343a40;
  text-align: center;
  margin-bottom: 10px;
`;

const SubTitle = styled.h2`
  font-size: 1.5em;
  color: #6c757d;
  text-align: center;
  margin-bottom: 50px;
`;

const Categories = () => {
  return (
    <GalleryContainer className="big-collection">
      <Title>Discover Our Furniture Collection</Title>
      <SubTitle>Experience the Blend of Comfort and Elegance</SubTitle>
      <FlexContainer className="collect-flex">
        {categoryData.map((image) => (
          <ImageWrapper key={image.id} className="collect">
            <Link to={`/products/${image.cat}`} className="image link">
              <img src={image.img} alt={image.alt} />
              <a className="link" href="#">
                {image.cat}
              </a>
            </Link>
          </ImageWrapper>
        ))}
      </FlexContainer>
    </GalleryContainer>
  );
};

export default Categories;

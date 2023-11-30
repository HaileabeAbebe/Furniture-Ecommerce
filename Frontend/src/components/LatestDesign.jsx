import styled, { keyframes } from "styled-components";

const BigShopContainer = styled.div`
  width: 90%;
  margin: 150px auto;
`;

const ShopTitle = styled.div`
  text-align: center;
  margin-bottom: 50px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.09);
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #343a40;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #6c757d;
`;

const ShopFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ShopOne = styled.div`
  width: 26%;
`;
const fadeInOverlay = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  padding: 0px 20px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  .txt {
    color: #fff;

    h3 {
      margin-bottom: 3px;
    }

    span {
      color: #45ccb8;
    }
  }

  .link {
    position: absolute;
    bottom: 50px;

    a {
      color: #fff;
      text-decoration: none;
      text-transform: capitalize;
      display: inline-block;
      position: relative;
      overflow: hidden;
      padding-bottom: 5px;

      &:hover {
        i {
          padding-left: 3px;
        }

        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: -100%;
          background: #fff;
          width: 100%;
          height: 2px;
          transition: left 0.4s ease-in-out;

          &:hover {
            left: 0;
          }
        }
      }
    }
  }
`;

const ImageOne = styled.div`
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
  &:hover ${Overlay} {
    opacity: 1;
    animation: ${fadeInOverlay} 0.3s ease-in-out forwards;
  }
`;

const job1 = keyframes`
    0%{
        opacity: 0;
        margin-bottom: 70px;
    }
    100%{
        opacity: 1;
        margin-bottom: 0px;
    }
`;

const job1_link = keyframes`
    0%{
        opacity: 0;
        bottom: 20px;
    }
    100%{
        opacity: 1;
        bottom: 50px;
    }
`;

const ShopTwo = styled.div`
  width: 44%;

  &:hover {
    .txt {
      animation: ${job1} 0.7s ease-in-out forwards;
    }

    .link {
      animation: ${job1_link} 0.7s ease-in-out forwards;
    }

    ${Overlay} {
      opacity: 1;
    }
  }

  @media (max-width: 991px) {
    width: 49%;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Text = styled.div`
  color: #fff;
`;

const ImageTitle = styled.h3`
  margin-bottom: 3px;
`;

const Category = styled.section`
  color: #45ccb8;
`;

const Link = styled.div`
  position: absolute;
  bottom: 50px;
`;

const LinkButton = styled.a`
  color: #fff;
  text-decoration: none;
  text-transform: capitalize;
  display: inline-block;
  position: relative;
  overflow: hidden;
  padding-bottom: 5px;
`;

const ArrowIcon = styled.i`
  vertical-align: middle;
  transition: padding 0.4s ease-in-out;
  font-size: 15px;
`;

function LatestDesign() {
  return (
    <BigShopContainer>
      <ShopTitle>
        <Title>
          We are very proud to present you <br /> our furniture
        </Title>
        <Description>
          Quality is the easiest way to make beautiful products.
        </Description>
      </ShopTitle>
      <ShopFlex>
        <ShopOne>
          <ImageOne>
            <img src="../assets/images/furn1.jpg" alt="" />
            <Overlay>
              <Text>
                <ImageTitle>White Chair</ImageTitle>
                <Category>
                  <span>Furniture</span> / Design
                </Category>
              </Text>
            </Overlay>
          </ImageOne>

          <ImageOne>
            <img src="../assets/images/furn2.jpg" alt="" />
            <Overlay>
              <Text>
                <ImageTitle>Blue Chair</ImageTitle>
                <Category>
                  <span>Furniture</span> / Design
                </Category>
                <Link>
                  <LinkButton href="#">
                    Shop Now{" "}
                    <ArrowIcon className="fas fa-long-arrow-alt-right" />
                  </LinkButton>
                </Link>
              </Text>
            </Overlay>
          </ImageOne>
        </ShopOne>

        <ShopOne>
          <ImageOne>
            <img src="../assets/images/furn3.jpg" alt="" />
            <Overlay>
              <Text>
                <ImageTitle>Black Chair</ImageTitle>
                <Category>
                  <span>Furniture</span> / Design
                </Category>
                <Link>
                  <LinkButton href="#">
                    Shop Now{" "}
                    <ArrowIcon className="fas fa-long-arrow-alt-right" />
                  </LinkButton>
                </Link>
              </Text>
            </Overlay>
          </ImageOne>

          <ImageOne>
            <img src="../assets/images/furn4.jpg" alt="" />
            <Overlay>
              <Text>
                <ImageTitle>White lamp</ImageTitle>
                <Category>
                  <span>Furniture</span> / Design
                </Category>
              </Text>
            </Overlay>
          </ImageOne>
        </ShopOne>

        <ShopTwo>
          <ImageOne>
            <img src="../assets/images/furn6.jpg" alt="" />
            <Overlay>
              <Text>
                <ImageTitle>Brown Chairs</ImageTitle>
                <Category>
                  <span>Furniture</span> / Design
                </Category>
                <Link>
                  <LinkButton href="#">
                    Shop Now{" "}
                    <ArrowIcon className="fas fa-long-arrow-alt-right" />
                  </LinkButton>
                </Link>
              </Text>
            </Overlay>
          </ImageOne>
        </ShopTwo>
      </ShopFlex>
    </BigShopContainer>
  );
}

export default LatestDesign;

import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../requestMethod";
import { addProduct } from "../redux/cartRedux";

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  height: 90vh;
  width: 100%;
  object-fit: contain;
`;
const InfoContainer = styled.div`
  padding: 0px 50px;
  flex: 1;
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  min-height: 100px;
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
// const FilterContainer = styled.div`
//   width: 50%;
//   margin: 30px 0;
//   display: flex;
//   justify-content: space-between;
// `;
// const Filter = styled.div`
//   display: flex;
//   align-items: center;
// `;
// const FilterTitle = styled.span`
//   font-size: 20px;
//   font-weight: 200;
//   margin-right: 5px;
// `;
// const FilterColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   border: 1px solid grey;
//   margin: 0 5px;
//   cursor: pointer;
// `;
// const FilterSize = styled.select`
//   margin-left: 10px;
//   padding: 5px;
// `;
// const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
`;
const Button = styled.button`
  padding: 10px;
  background-color: white;
  border: 1px solid teal;
  cursor: pointer;
  color: teal;
  margin: 10px 0;
  border-radius: 3px;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  // const [color, setColor] = useState("");
  // const [size, setSize] = useState("");

  const { isLoggedIn } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendUrl = "http://localhost:5000";

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (isLoggedIn) {
      dispatch(addProduct({ ...product, quantity }));
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Wrapper>
        <ImgContainer>
          <Button>
            <Link to="/products" className="link">
              CONTINUE SHOPPING
            </Link>
          </Button>
          <Image src={`${backendUrl}/${product?.img}`} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>${product.price}</Price>
          {/* <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer> */}
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec", product._id)} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc", product._id)} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </>
  );
};

export default Product;

import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/userRedux";
import noavatar from "../assets/noavatar.png";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 10px 25px;
  border-radius: 10px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "60px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.div`
  font-weight: bold;
  ${mobile({ display: "none" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
  margin-left: 25px;
`;
const Image = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: gray;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  gap: 10px;
  width: 200px;
  font-weight: 300;
  border: 1px solid gray;
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 2;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;
`;
const SmallText = styled.p`
  font-size: 12px;
  color: gray;
`;

const HorizontalLine = styled.hr`
  color: #000;
  height: 1px;
  width: 100%;
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const quantity = useSelector((state) => state.cart?.quantity);

  const currentUser = useSelector((state) => state.user?.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Link to="/" className="link">
              <Text style={{ fontWeight: 600 }}>Dese Furniture.</Text>
            </Link>
          </Logo>
        </Center>
        <Right>
          {!currentUser && (
            <>
              <MenuItem>
                <Link to="/register" className="link">
                  REGISTER
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login" className="link">
                  SIGN IN
                </Link>
              </MenuItem>
            </>
          )}
          {currentUser && (
            <>
              <Link to="/cart" className="link">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
              <User
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <Image src={currentUser.img || noavatar} alt="" />
                {open && (
                  <Option>
                    <Text>{currentUser.username}</Text>
                    <SmallText>{currentUser.email}</SmallText>
                    <HorizontalLine />
                    <Link to="/myProfile" className="link">
                      My Profile
                    </Link>
                    <Link to="/editProfile" className="link">
                      Edit Profile
                    </Link>
                    <Link onClick={handleLogout} className="link">
                      Logout
                    </Link>
                  </Option>
                )}
              </User>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

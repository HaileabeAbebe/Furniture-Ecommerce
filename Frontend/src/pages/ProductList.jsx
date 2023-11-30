import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Products from "../components/Products";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto; /* Center the content horizontally */
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const Select = styled.select`
  padding: 10px;
  outline: none;
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  // const [filters, setFilters] = useState({});
  const [cat, setCat] = useState(location.pathname.split("/")[2] || "");

  const [sort, setSort] = useState("newest");

  useEffect(() => {});
  return (
    <Wrapper>
      <Title>{cat || "Products"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Category:</FilterText>
          <Select
            name="category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <Option value="">All</Option> {/* Add the "All" option */}
            <Option value="Chair">Chair</Option>
            <Option value="Office-Chair">Office Chair</Option>
            <Option value="Couch">Couch</Option>
            <Option value="Desk">Desk</Option>
            <Option value="Table">Table</Option>
            <Option value="Bed">Bed</Option>
            <Option value="Kitchen">Kitchen</Option>
            <Option value="Pooltable">Pool Tables</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat === "All" ? "" : cat} sort={sort} />
    </Wrapper>
  );
};

export default ProductList;

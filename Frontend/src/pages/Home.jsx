import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import LatestDesign from "./../components/LatestDesign";
import PoolTable3dModel from "../components/PoolTable3dModel";

const Home = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <PoolTable3dModel />
      <Products isHomePage={true} />
      <LatestDesign />
      <NewsLetter />
    </div>
  );
};

export default Home;

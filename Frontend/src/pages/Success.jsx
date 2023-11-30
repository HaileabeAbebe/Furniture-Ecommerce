import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  console.log(location);
  return <div>Successfully paid</div>;
};

export default Success;

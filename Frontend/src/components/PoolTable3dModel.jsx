import { Suspense } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Skeleton from "react-loading-skeleton";
import Pool_table from "../components/Pool_table";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  width: 100vw;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background-color: #f8f9fa;
  color: #343a40;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
`;

const PoolTable3dModel = () => {
  return (
    <StyledDiv>
      <TextSection>
        <Title>The Best Furniture Manufacturer Of Your Choice</Title>
        <Description>
          Furniture power is a software as services for multipurpose business
          management system, especially for them who are running two or more
          business explore the future Furniture power is a software as services.
        </Description>
      </TextSection>
      <Suspense
        fallback={
          <Skeleton
            className="fallback-ui"
            height={300}
            width={400}
            color="red"
            baseColor="#c4cede"
            highlightColor="#edf2f8"
          />
        }
      >
        <Canvas>
          <Stage environment={"city"} intensity={0.6} scale={[3, 3, 3]}>
            <Pool_table />
          </Stage>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </Suspense>
    </StyledDiv>
  );
};

export default PoolTable3dModel;

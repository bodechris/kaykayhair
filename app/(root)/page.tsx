import HeroSliderV0 from "@/components/HeroSliderV0/HeroSliderV0";
import styled from "styled-components";

export default function Home() {
  return (
    <HomePageWrapper>
        <HeroSliderV0 />
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;
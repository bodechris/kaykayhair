import styled from 'styled-components';
import HeroSlideV0 from './HeroSlideV0';

function HeroSliderV0() {
  return (
    <HeroSliderV0Wrapper>
        <HeroSlideV0 />
    </HeroSliderV0Wrapper>
  )
}

export default HeroSliderV0;

const HeroSliderV0Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ecd4f5;
  position: relative;

  img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;
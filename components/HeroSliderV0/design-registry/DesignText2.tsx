import styled from 'styled-components';

export type DesignText2Props = {
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
}
function DesignText2({ text1, text2, text3, text4 }: DesignText2Props) {
  return (
    <DesignText2Wrapper>
        {text1 && <h1>{text1}</h1>}
        {text2 && <h2>{text2}</h2>}
        {text3 && <h3>{text3}</h3>}
        {text4 && <h4>{text4}</h4>}
    </DesignText2Wrapper>
  )
}

export default DesignText2;

const DesignText2Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  h1,
  h2,
  h3,
  h4 {
    font-family: var(--kh-font-family-display);
    line-height: 0.9;
    letter-spacing: var(--kh-letter-spacing-tight);
    color: #1d1320;
  }

  h1 {
    font-size: clamp(3rem, 8vw, 6rem);
  }

  h2,
  h3,
  h4 {
    font-size: clamp(2.25rem, 5.4vw, 4.6rem);
  }
`;
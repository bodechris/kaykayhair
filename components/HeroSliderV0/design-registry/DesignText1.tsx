import styled from 'styled-components';

export type DesignText1Props = {
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  colors?: string[];
}
function DesignText1({ text1, text2, text3, text4, colors=["#dd3f6f", '#111'] }: DesignText1Props) {
  return (
    <DesignText1Wrapper colors={colors}>
        {text1 && <b>{text1}</b>}
        {text2 && <span>{text2}</span>}
        {text3 && <strong>{text3}</strong>}
        {text4 && <span>{text4}</span>}
    </DesignText1Wrapper>
  )
}

export default DesignText1;


type DesignText1WrapperProps = {
  colors: string[];
}
const DesignText1Wrapper = styled.div<DesignText1WrapperProps>`
  display: flex;
  flex-flow: row wrap;
  gap: 0.1rem;

  width: min(100%, 400px);
  font-family: var(--kh-font-family-display);
  
  line-height: 0.8;

  span {
    // font-family: var(--kh-font-family-body);
    letter-spacing: var(--kh-letter-spacing-tight);
    font-size: clamp(2rem, 6vw, 3rem);
    font-style: italic;
    font-weight: bolder;
    padding: 1.5rem 1rem;
    color: ${props => props.colors[1]};
  }

  b {
    letter-spacing: var(--kh-letter-spacing-tight);
    font-size: clamp(3rem, 10vw, 5rem);
    font-style: italic;
    color: ${props => props.colors[0]};
  }

  strong {
    letter-spacing: var(--kh-letter-spacing-tight);
    font-size: clamp(4rem, 10vw, 6rem);
    font-style: italic;
    color: ${props => props.colors[0]};
  }

`;
import React from 'react';
import styled from 'styled-components';

export type DesignText3Props = {
  text1?: string;
  description?: string;
  ctas?: { href: string; label: string }[];
  customStyles?: React.CSSProperties | Record<string, any>;
}
function DesignText3({ text1, description, ctas, customStyles }: DesignText3Props) {
  return (
    <DesignText3Wrapper customstyles={customStyles}>
      <h2>{text1}</h2>
      <p>{description}</p>
      <div className="ctas">
        {ctas && ctas.map((cta, index) => (
            <a key={index} href={cta.href}>{cta.label}</a>
        ))}
       </div>
    </DesignText3Wrapper>
  )
}

export default DesignText3;


type DesignText3WrapperProps = {
  customstyles?: React.CSSProperties | Record<string, any>;
}
const DesignText3Wrapper = styled.div<DesignText3WrapperProps>`
  width: min(50%, 300px);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20%;
  right: 5%;
  gap: 1rem;
  text-align: right;
  align-items: flex-end;


  border-right: 5px solid #e65277;
  padding-right: 1.5rem;

  h2 {
        font-family: var(--kh-font-family-body);
        letter-spacing: var(--kh-letter-spacing-tight);
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: bolder;
        line-height: 0.9;
        color: #fff;
    }
  p {
    font-size: clamp(8px, 1.1vw, 12px);
    line-height: 1.3;
    max-width: 400px;
    font-weight: 600;
  }
  .ctas {
    display: flex;
    gap: 1rem;

    button, a {
        font-size: clamp(0.75rem, 1vw, 1rem);
        font-weight: bolder;
    }
  }


    ${(props) => props.customstyles && { ...props.customstyles }}
`;
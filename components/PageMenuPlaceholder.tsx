import styled from 'styled-components';

type PageMenuPlaceholderProps = {
  title: string;
  children?: React.ReactNode;
  width?: string;
};

function PageMenuPlaceholder({ title, children, width="min(90%, 1000px)" }: PageMenuPlaceholderProps) {
  return (
    <PlaceholderWrapper aria-label={title} width={width}>
      {/* <h1>{title}</h1> */}
      <div className="page-holder-v0">
        {children}
      </div>
    </PlaceholderWrapper>
  );
}

export default PageMenuPlaceholder;


type PlaceholerWrapperType = {
  width?: string;
}
const PlaceholderWrapper = styled.section<PlaceholerWrapperType>`
  width: 100%;
  min-height: 100vh;
  padding-top: clamp(7.5rem, 12vw, 10rem);
  background: var(--kh-bg-main);
  position: relative;

  h1 {
    position: relative;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    font-size: clamp(4rem, 10vw, 8rem);
  }

  .page-holder-v0 {
    margin: 0 auto;
    width: ${({ width }) => width };
    height: auto;
    min-height: 100vh;
    // border-radius: 1rem;
    background: #fff;
    // box-shadow: 0 12px 30px rgba(94, 50, 90, 0.12);
    margin-bottom: 10rem;
  }



`;
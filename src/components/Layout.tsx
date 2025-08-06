import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import type { ReactNode } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Wrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  );
}

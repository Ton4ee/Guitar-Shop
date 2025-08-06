import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const Title = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export default function Header() {
  const navigate = useNavigate();
  return (
    <HeaderContainer onClick={() => navigate('/')}>
      <Title>🎸 Guitar Shop</Title>
    </HeaderContainer>
  );
}

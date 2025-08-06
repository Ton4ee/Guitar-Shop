import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FooterBar = styled.footer`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const LangButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }
`;

export default function Footer() {
  const { i18n } = useTranslation();

  return (
    <FooterBar>
      <LangButton onClick={() => i18n.changeLanguage('en')}>EN</LangButton>
      <LangButton onClick={() => i18n.changeLanguage('mk')}>MK</LangButton>
      <LangButton onClick={() => i18n.changeLanguage('al')}>AL</LangButton>
    </FooterBar>
  );
}

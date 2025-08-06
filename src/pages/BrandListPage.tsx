import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { Brand } from '../types/graphql';

const GET_BRANDS = gql`
  query {
    findAllBrands {
      id
      name
      image
    }
  }
`;

const Container = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 32px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 140px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 12px;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

export default function BrandListPage() {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (loading) return <p>{t('loading')}</p>;
  if (error) return <p>{t('errorLoading')}</p>;

  return (
    <Container>
      <Title>{t('selectBrand')}</Title>
      <Grid>
        {data.findAllBrands.map((brand: Brand) => (
          <Card key={brand.id} onClick={() => navigate(`/brands/${brand.id}`)}>
            <img src={brand.image} alt={brand.name} />
            <h3>{brand.name}</h3>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { Model } from '../types/graphql';

const GET_MODELS = gql`
  query GetModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      price
    }
  }
`;

const SEARCH_MODELS = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      image
      price
    }
  }
`;

const Container = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: auto;
`;

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const Search = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 250px;
`;

const Filter = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
`;

const Card = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
  background: #fff;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Sentinel = styled.div`
  height: 1px;
`;

export default function ModelListPage() {
  const { t } = useTranslation();
  const { brandId } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const { loading, error, data } = useQuery(GET_MODELS, {
    variables: { id: brandId!, sortBy: { field: 'name', order: 'ASC' } },
    fetchPolicy: 'cache-and-network',
  });

  const [searchModels, { data: searchData, loading: searchLoading }] =
    useLazyQuery(SEARCH_MODELS);

  useEffect(() => {
    if (searchTerm.trim()) {
      setVisibleCount(6);
      searchModels({ variables: { brandId: brandId!, name: searchTerm } });
    }
  }, [searchTerm, brandId, searchModels]);

  const models: Model[] = searchTerm
    ? searchData?.searchModels ?? []
    : data?.findBrandModels ?? [];

  const filtered = models.filter((m) =>
    typeFilter ? m.type?.toLowerCase() === typeFilter.toLowerCase() : true
  );

  const displayed = filtered.slice(0, visibleCount);
  const isLoading = loading || (searchTerm && searchLoading);

  // Infinite scroll sentinel logic
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      if (!node) return;
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + 6);
        }
      });
      observer.current.observe(node);
    },
    []
  );

  if (isLoading) return <p>{t('loading')}</p>;
  if (error) return <p>{t('errorLoading')}</p>;

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}>
        {t('backToBrands')}
      </BackButton>
      <h1>{t('models')}</h1>

      <Controls>
        <Search
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Filter
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setVisibleCount(6);
          }}
        >
          <option value="">{t('allTypes')}</option>
          <option value="Electric">{t('electric')}</option>
          <option value="Acoustic">{t('acoustic')}</option>
          <option value="Classic">{t('classic')}</option>
          <option value="Bass">{t('bass')}</option>
        </Filter>
      </Controls>

      <Grid>
        {displayed.map((model) => (
          <Card
            key={model.id}
            onClick={() => navigate(`/brands/${brandId}/models/${model.id}`)}
          >
            <img src={model.image || '/fallback.jpg'} alt={model.name} />
            <div>
              <h3>{model.name}</h3>
              <p>{model.type}</p>
              <p>${model.price}</p>
            </div>
          </Card>
        ))}
      </Grid>

      {visibleCount < filtered.length && <Sentinel ref={sentinelRef} />}
    </Container>
  );
}

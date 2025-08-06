import { gql, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { Model } from '../types/graphql';

const GET_MODEL_DETAILS = gql`
  query GetModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      image
      type
      description
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  color: #0070f3;
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 16px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${({ active }) => (active ? '#333' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  font-weight: bold;
  cursor: pointer;
`;

const SpecItem = styled.p`
  margin: 0.5rem 0;
`;

const MusicianCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }

  h4 {
    margin: 0;
  }

  p {
    margin: 4px 0 0;
    color: #666;
  }
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  margin-top: 12px;
  border: none;
  border-radius: 8px;
  background: #333;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #000;
  }
`;

export default function ModelDetailsPage() {
  const { brandId, modelId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [tab, setTab] = useState<'specs' | 'musicians'>('specs');
  const [visibleMusicians, setVisibleMusicians] = useState(2);

  const { data, loading, error } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId },
  });

  if (loading) return <p>{t('loading')}</p>;
  if (error) return <p>{t('errorLoading')}</p>;

  const model: Model = data.findUniqueModel;

  return (
    <Container>
      <BackButton onClick={() => navigate(`/brands/${brandId}`)}>
        {t('backToModels')}
      </BackButton>

      <h1>{model.name}</h1>
      <Image src={model.image} alt={model.name} />
      <p>{model.description}</p>

      <Tabs>
        <Tab active={tab === 'specs'} onClick={() => setTab('specs')}>
          {t('specs')}
        </Tab>
        <Tab active={tab === 'musicians'} onClick={() => setTab('musicians')}>
          {t('musicians')}
        </Tab>
      </Tabs>

      {tab === 'specs' &&
        Object.entries(model.specs).map(([key, value]) => (
          <SpecItem key={key}>
            <strong>{key}:</strong> {value}
          </SpecItem>
        ))}

      {tab === 'musicians' && (
        <>
          {model.musicians.slice(0, visibleMusicians).map((m, i) => (
            <MusicianCard key={i}>
              <img src={m.musicianImage} alt={m.name} />
              <div>
                <h4>{m.name}</h4>
                <p>Bands: {m.bands.join(', ')}</p>
              </div>
            </MusicianCard>
          ))}
          {visibleMusicians < model.musicians.length && (
            <LoadMoreButton onClick={() => setVisibleMusicians((prev) => prev + 2)}>
              {t('showMore')}
            </LoadMoreButton>
          )}
        </>
      )}
    </Container>
  );
}

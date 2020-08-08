import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMovies } from './api';

const Container = styled.div`
  margin-bottom: 10px;
  font-weight: 700;
`;

function Infinite() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(0);

  const getMovieInfo = async (n) => {
    try {
      const {
        data: {
          data: { movies },
        },
      } = await getMovies(n);
      setInfo([...info, ...movies]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const onScroll = (e) => {
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight ===
      document.documentElement.scrollHeight
    )
      setPage(page + 1);
  };
  useEffect(() => {
    getMovieInfo(page);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [page]);

  return loading ? (
    'Loading...'
  ) : (
    <>
      <h2>Infinite Movies / Page {page}</h2>
      {info.map((movie) => (
        <Container>{movie.title}</Container>
      ))}
    </>
  );
}

export default Infinite;

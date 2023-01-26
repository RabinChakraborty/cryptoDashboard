import { createContext, useLayoutEffect, useState } from 'react';

//create context object
export const CryptoContext = createContext({});

/*cryptoContext component contains api data of cryptocoins,
 cryptoId and search cryptos and there states as well
*/
export const CryptoProvider = ({ children }) => {
  const [cryptoId, setCryptoId] = useState();
  const [cryptoData, setCryptoData] = useState();
  const [currency, setCurrency] = useState('usd');
  const [page, setPage] = useState(1);
  const [totalPages] = useState(350);
  const [perPage, setPerPage] = useState(8);
  const [searchData, setSearchData] = useState();
  const [coinSearch, setCoinSearch] = useState('');
  const [id, setCoinId] = useState('');

  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=market_cap_desc&page=${page}&per_page=${perPage}`
      )
        .then((res) => res.json())
        .then((json) => json);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCryptoId = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}&order=market_cap_desc&page=1&per_page=200`
      )
        .then((res) => res.json())
        .then((json) => json);
      setCryptoId(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchResult = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(data);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
    getCryptoId();
  }, [currency, page, perPage, coinSearch]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        currency,
        setCurrency,
        page,
        setPage,
        totalPages,
        setPerPage,
        perPage,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        cryptoId,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

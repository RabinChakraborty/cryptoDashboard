import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import selectIcon from '../assets/select-icon.svg';
import Pagination from './Pagination';

/* sidebar has crypto details such as CoinName, market cap,
and last 1 day(24hours) price change inside it */

export const SideBar = () => {
  const { cryptoData, setSortBy, resetFunction, currency } =
    useContext(CryptoContext);

  return (
    <div className='bg-gray-300 bg-opacity-10 backdrop-blur-md border border-yellow-600 rounded-lg shadow-lg'>
      <div data-testid='Sidebar-1'>
        <p className='text-white text-md text-center mt-4 font-semibold'>
         Market Cap
        </p>
      </div>
      <div>
        {cryptoData ? (
          <table className='w-full table-auto'>
            <tbody>
              {cryptoData.map((cryptoData) => {
                return (
                  <div
                    key={cryptoData.id}
                    className='text-center text-lg border-b border-yellow-600 hover:bg-gray-600 last:border-b-0'
                  >
                    <img
                      src={cryptoData.image}
                      alt={cryptoData.name}
                      className='flex absolute w-[1.1rem] h-[1.1rem] ml-3 mt-2'
                    />

                    <span className='flex flex-row pl-9 mt-2 text-[13px] font-semibold text-white'>
                      {cryptoData.name}
                    </span>

                    <div className='flex flex-row justify-end mr-2'>
                      <div
                        className={`text-[12px] font-semibold ${
                          cryptoData.market_cap_change_percentage_24h > 0
                            ? 'text-green-500 '
                            : 'text-orange-400 '
                        }`}
                      >
                        <i
                          className={`mr-1 text-xs ${
                            cryptoData.market_cap_change_percentage_24h > 0
                              ? 'fa-solid fa-caret-up'
                              : 'fa-solid fa-caret-down'
                          }`}
                        ></i>
                        <span>
                          {parseFloat(
                            cryptoData.market_cap_change_percentage_24h
                          ).toFixed(2)}{' '}
                          %
                        </span>
                      </div>
                    </div>

                    <div className='-ml-9'>
                      <span className='text-[11px] -mt-8 ml-3 text-gray-200 font-semibold flex pl-8 mx-4 mb-4 truncate'>
                        Mkt.Cap{' '}
                        {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: currency,
                        }).format(cryptoData.market_cap)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>

      <Pagination />
    </div>
  );
};

export default SideBar;

import { useState, useEffect, createContext, useContext } from 'react';
// import { ReactSession } from 'react-client-session';
// import decode from 'jwt-decode';

const TailorsContext = createContext();

function TailorsProvider({ children }) {
  const [printData, setPrintData] = useState({});

  useEffect(() => {}, []);

  return (
    <TailorsContext.Provider value={{ printData, setPrintData }}>
      {children}
    </TailorsContext.Provider>
  );
}

export { TailorsProvider, TailorsContext };
export const useTailors = () => useContext(TailorsContext);

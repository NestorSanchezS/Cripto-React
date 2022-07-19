import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelectMonedas } from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
import { Error } from "./Error";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

export const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);
  const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas(
    "Elige tu Criptomoneda",
    criptos
  );

  useEffect(() => {
    //Aqui utilizamos fetch
    // const URL =
    //   "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
    // fetch(URL)
    //   .then((response) => response.json())
    //   .then((responseData) => console.log(responseData));

    //Aqui utilizamos Async y await
    const callAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const response = await fetch(url);
      const resultAPI = await response.json();
      const arrayCriptos = resultAPI.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    };

    callAPI();
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if ([moneda, criptoMoneda].includes("")) {
      setError("ERROR");
      return;
    }

    setError(false);
    setMonedas({ moneda, criptoMoneda });
  };

  return (
    <form onSubmit={handleSubmitForm}>
      {error && <Error>Todos los campos son requerids mi compa</Error>}
      <SelectMonedas />
      <SelectCriptoMoneda />
      <InputSubmit type="submit" value="Cotizar" />
    </form>
  );
};

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ImagenCripto from "./assets/imagen-criptos.png";
import { Formulario } from "./components/Formulario";
import { useSelectMonedas } from "./hooks/useSelectMonedas";
import { Resultado } from "./components/Resultado";
import { Spinner } from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px 0 auto 0;
  display: block;
`;

const Heading = styled.h1`
  font-family: "lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

export const App = () => {
  const [monedas, setMonedas] = useState({});
  const [cotizacion, setCotizacion] = useState({});
  const [isValidResult, setisValidResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setIsLoading(true);
        const { moneda, criptoMoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => setCotizacion(data.DISPLAY[criptoMoneda][moneda]));
        setisValidResult(true);
        setIsLoading(false);
      };
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="Imagen Criptomonedas" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />
        {isLoading && <Spinner />}
        {isValidResult && <Resultado cotizacion={cotizacion} />}
      </div>
    </Contenedor>
  );
};

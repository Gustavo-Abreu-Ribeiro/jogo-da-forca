import { useEffect, useState } from 'react';
import './App.css';

const API_URL = "https://api.dicionario-aberto.net/random";

function App() {
  const [palavra, setPalavra] = useState("");
  const [oculta, setOculta] = useState([]);
  const [tentativas, setTentativas] = useState(6);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [letra, setLetra] = useState("");
  const [estado, setEstado] = useState("jogando");

  useEffect(() => {
    async function carregarPalavra() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const palavraLimpa = data.word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        setPalavra(palavraLimpa);
        setOculta(Array(palavraLimpa.length).fill("_"));
      } catch (e) {
        const fallback = "deterministico";
        setPalavra(fallback);
        setOculta(Array(fallback.length).fill("_"));
      }
    }

    carregarPalavra();
  }, []);

  function tentar() {
    const l = letra.toLowerCase();
    setLetra("");

    if (!l.match(/^[a-zA-Z]$/) || estado !== "jogando") return;

    if (palavra.includes(l)) {
      const novaOculta = [...oculta];
      palavra.split("").forEach((char, i) => {
        if (char === l) novaOculta[i] = l;
      });
      setOculta(novaOculta);
      if (!novaOculta.includes("_")) setEstado("vitoria");
    } else {
      if (!letrasErradas.includes(l)) {
        const novasErradas = [...letrasErradas, l];
        setLetrasErradas(novasErradas);
        const novasTentativas = tentativas - 1;
        setTentativas(novasTentativas);
        if (novasTentativas === 0) setEstado("derrota");
      }
    }
  }

  return (
    <div className="container">
      <h1>Jogo da Forca - React</h1>
      <p className="palavra">{oculta.join(" ")}</p>

      <input
        type="text"
        maxLength={1}
        value={letra}
        onChange={(e) => setLetra(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && tentar()}
        disabled={estado !== "jogando"}
      />
      <button onClick={tentar} disabled={estado !== "jogando"}>Tentar</button>

      <p>Erros: {letrasErradas.length}/6</p>
      <p>Letras erradas: {letrasErradas.join(", ")}</p>

      {estado === "vitoria" && <p className="vitoria">🎉 Você venceu!</p>}
      {estado === "derrota" && <p className="derrota">💀 Você perdeu! A palavra era: {palavra}</p>}
    </div>
  );
}

export default App;

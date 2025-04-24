import { useState, useEffect } from 'react';
import { Button, Container, Box, Typography, Grid, Divider } from '@mui/material';
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';
import './Animations.css'; 

const nodesData = [
  { id: 'q0', type: 'input', data: { label: 'q0 (Início)' }, position: { x: 100, y: 50 }, style: { backgroundColor: 'lightgrey', width: '120px', height: '40px' } },
  { id: 'q1', data: { label: 'q1 (Jogo)' }, position: { x: 200, y: 200 }, style: { backgroundColor: 'lightgrey', width: '120px', height: '40px' } },
  { id: 'q2', data: { label: 'q2 (Vitória)' }, position: { x: 400, y: 50 }, style: { backgroundColor: 'lightgrey', width: '120px', height: '40px' } },
  { id: 'q3', data: { label: 'q3 (Derrota)' }, position: { x: 400, y: 200 }, style: { backgroundColor: 'lightgrey', width: '120px', height: '40px' } },
];

const edgesData = [
  { id: 'e0-1', source: 'q0', target: 'q1', animated: true },
  { id: 'e1-1', source: 'q1', target: 'q1', animated: true },
  { id: 'e1-2', source: 'q1', target: 'q2', animated: true },
  { id: 'e1-3', source: 'q1', target: 'q3', animated: true },
];

function App() {
  const [palavraSecreta, setPalavraSecreta] = useState('');
  const [palavraOculta, setPalavraOculta] = useState([]);
  const [tentativas, setTentativas] = useState(6);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [estado, setEstado] = useState('q0'); 
  const [mensagem, setMensagem] = useState('');
  const [nodoAnimado, setNodoAnimado] = useState(null); 
  const [letrasUsadas, setLetrasUsadas] = useState([]); 

  const reiniciarJogo = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'palavras.json')
      .then((res) => res.json())
      .then((data) => {
        const sorteada = data.palavras[Math.floor(Math.random() * data.palavras.length)];
        setPalavraSecreta(sorteada);
        setPalavraOculta(Array(sorteada.length).fill("_"));
      })
      .catch((err) => {
        console.error("Erro ao carregar palavras:", err);
      });
  }, []);

  const verificarLetra = (letra) => {
    if (!letrasUsadas.includes(letra)) { 
      setLetrasUsadas([...letrasUsadas, letra]); 
      if (palavraSecreta.includes(letra)) {
        const novaPalavraOculta = [...palavraOculta];
        for (let i = 0; i < palavraSecreta.length; i++) {
          if (palavraSecreta[i] === letra) {
            novaPalavraOculta[i] = letra;
          }
        }
        setPalavraOculta(novaPalavraOculta);
      } else {
        setTentativas(tentativas - 1);
        setLetrasErradas([...letrasErradas, letra]);
      }
    }
  };

  const animarNo = (id, tipoAnimacao) => {
    setNodoAnimado(id); 
  };

  useEffect(() => {
    if (tentativas === 0) {
      setEstado('q3');
      setMensagem(`Você perdeu! A palavra correta era: ${palavraSecreta}. Tente novamente.`);
      animarNo('q3', 'derrota');
    } else if (!palavraOculta.includes('_')) {
      setEstado('q2');
      setMensagem('Você ganhou! Parabéns!');
      animarNo('q2', 'vitoria');
    } else {
      setEstado('q1');
      setMensagem('');
      animarNo('q1', 'piscar');
    }
  }, [tentativas, palavraOculta]);
  

  const TecladoVirtual = ({ onPress }) => {
    const letras = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return (
      <Grid container spacing={1} sx={{ marginTop: 2, justifyContent: 'center' }}>
        {letras.map((letra) => (
          <Grid item xs={3} key={letra}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => onPress(letra)}
              disabled={letrasUsadas.includes(letra)} 
              sx={{
                textTransform: 'uppercase',
                backgroundColor: letrasUsadas.includes(letra) ? 'invisible' : '', 
              }}
            >
              {letra}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <ReactFlowProvider>
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#fffff' }}>
      <Box sx={{ border: '2px solid #1976d2', borderRadius: 2, padding: 2, mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: "'Roboto', sans-serif", color: 'text.primary' }}>
            Jogo da Forca com Autômato
          </Typography>
        </Box>
        <Box sx={{ height: '300px', width: '100%', mb: 4, justifyContent: 'center' }}>
        <ReactFlow
  nodes={nodesData.map((node) => ({
    ...node,
    style: nodoAnimado === node.id
      ? { 
          ...node.style, 
          animation: nodoAnimado === 'q1' 
            ? 'piscar 1s infinite' 
            : nodoAnimado === 'q2' 
              ? 'vitoria 1s forwards' 
              : nodoAnimado === 'q3'
                ? 'derrota 1s forwards' 
                : '' 
      }
      : node.style
  }))}
  edges={edgesData}
/>

        </Box>

        <Typography variant="h5">Palavra: {palavraOculta.join(' ')}</Typography>
        <Typography variant="h6">Tentativas restantes: {tentativas}</Typography>
        <Typography variant="h6">Letras erradas: {letrasErradas.join(', ')}</Typography>

        <TecladoVirtual onPress={verificarLetra} />

        {mensagem && (
          <Typography variant="h6" color={estado === 'q3' ? 'error' : 'primary'} sx={{ mt: 2 }}>
            {mensagem}
          </Typography>
        )}

        <Button variant="contained" color="primary" onClick={reiniciarJogo} sx={{ mt: 3 }}>
          Jogar de Novo
        </Button>
        <Divider sx={{ width: '100%', mb: 4 }} />
        <Typography variant="h7" sx={{ fontWeight: 'bold', fontFamily: "'Roboto', sans-serif", color: 'text.primary' }}>
            Projeto Desenvolvido por Gustavo Emanuel e Augusto Liberato
          </Typography>
        
      </Container>
      
    </ReactFlowProvider>
  );
}

export default App;

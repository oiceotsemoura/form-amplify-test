import React, {useState} from 'react';
import axios from 'axios';
import {Container, Input, Label, FormContainer, Button} from './styles'
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [posts, setPosts] = useState([]);

  const handleNomeChange = (event: any) => {
    setNome(event.target.value);
  };

  const handleCPFChange = (event: any) => {
    setCPF(event.target.value);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <Container>
      <h1>Formulário React</h1>
      <FormContainer>
        <Label htmlFor="nome">Nome:</Label>
        <Input
          type="text"
          id="nome"
          value={nome}
          onChange={handleNomeChange}
        />
        <Label htmlFor="cpf">CPF:</Label>
        <Input
          type="text"
          id="cpf"
          value={cpf}
          onChange={handleCPFChange}
        />
      <Button onClick={fetchPosts}>Logar</Button>
  
        {posts && <div>
          <h2>Posts:</h2>
          <ul>
            {posts.map((post: any) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>}
      </FormContainer>
    </Container>
  );
}

export default App;

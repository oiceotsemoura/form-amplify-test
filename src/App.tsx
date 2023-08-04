import React, { useState } from "react";
import axios from "axios";
import { Container, Input, Label, FormContainer, CardWrapper } from "./styles";
import { Card, CardContent, Button, CircularProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleNomeChange = (event: any) => {
    setNome(event.target.value);
  };

  const handleCPFChange = (event: any) => {
    setCPF(event.target.value);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setTimeout(() => {
        setPosts(response.data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <Container>
      <h1>Formulário Valora</h1>
      <FormContainer>
        <Label htmlFor="nome">Nome:</Label>
        <Input type="text" id="nome" value={nome} onChange={handleNomeChange} />

        <Label htmlFor="cpf">CPF:</Label>
        <Input type="text" id="cpf" value={cpf} onChange={handleCPFChange} />

        <Button onClick={fetchPosts}>Logar</Button>
        {loading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={50} />
          </div>
        ) : (
          posts.length > 0 && (
            <div>
              <h2>Talhões:</h2>
              <ul>
                {posts.map((post: any, index: number) => (
                  <CardWrapper key={post.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <h3>Talhão {index + 1}</h3>
                        <p>{post.body}</p>
                        <Button
                          startIcon={<Edit />}
                          variant="outlined"
                          color="primary"
                        >
                          Editar
                        </Button>
                        <Button
                          startIcon={<Delete />}
                          variant="outlined"
                          color="secondary"
                        >
                          Excluir
                        </Button>
                      </CardContent>
                    </Card>
                  </CardWrapper>
                ))}
              </ul>
            </div>
          )
        )}
      </FormContainer>
    </Container>
  );
}

export default App;

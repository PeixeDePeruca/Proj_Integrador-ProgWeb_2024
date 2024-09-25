import styles from "@/styles/homePage.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { checkToken } from "@/services/tokenConfig";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";

// Componente Principal Home
export default function Home() {
  const router = useRouter();
  const [data, setData]: any = useState(undefined);
  const [saveData, setSaveData]: any = useState(undefined);
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState<string | null>(null);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  // Função para buscar dados de jogos
  async function fetchData() {
    try {
      const response = await fetch(`/api/action/game/select`, { method: "GET" });
      const responseJson = await response.json();

      setData(responseJson.data);
      setSaveData(responseJson.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleFavorite() {
    const userId = getCookie("userId");
  
    if (userId && data?.id) {
      if (isFavorite) {
        // Remover dos favoritos
        await fetch("/api/action/favorite/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, gameId: data.id }),
        });
        setIsFavorite(false);
      } else {
        // Adicionar aos favoritos
        await fetch("/api/action/favorite/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, gameId: data.id }),
        });
        setIsFavorite(true);
      }
    }
  }
  // Função para buscar o email
  async function fetchDataEmail() {
    try {
      const userId = getCookie("userId"); // Obtenha o userId dos cookies
      if (userId) {
        const response = await fetch(`/api/action/user/select`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseJson = await response.json();

        if (responseJson && responseJson.data) {
          setUserEmail(responseJson.data.email);
        } else {
          console.error("Email not found in response");
        }
      } else {
        console.error("User ID not found");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Função para buscar e filtrar os jogos
  function searchFilter(array: any, text: string) {
    if (text === "") {
      return array;
    } else {
      return array.filter((singleGame: any) =>
        singleGame.name.toLowerCase().includes(text.toLowerCase())
      );
    }
  }

  // Submissão do formulário de busca
  function formSubmit(event: any) {
    event.preventDefault();
    try {
      const filteredGames = searchFilter(saveData, name);
      setData(filteredGames);
    } catch (err) {
      console.log(err);
    }
  }

  // Função para logout
  function logOut() {
    deleteCookie("authorization");
    router.push(`/user/login`);
  }

  // Função ao clicar no jogo
  function gameClick(gameName: string, gameId: number) {
    setSelectedGameName(gameName);
    setSelectedGameId(gameId);
    router.push(`/game/` + gameName);
  }

  // UseEffect para buscar dados do usuário e jogos
  useEffect(() => {
    fetchData(); // Busca jogos
    fetchDataEmail(); // Busca e-mail
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title} onClick={logOut}>Tales News</h1>

        <a href="" className={styles.p}>Inicio</a>
        <Link href={`/game/Create`} className={styles.p}>Adicionar Jogos</Link>
        {/* O botão para direcionar para a pagina de Favoritos */}
        <Link href={`/favorite/favorite`}  className={styles.p}>
          <button>Ver Favoritos</button>
        </Link>

        {/* Barra de pesquisa */}
        <form className={styles.NavBarSearch} onSubmit={formSubmit}>
          <input
            type="text"
            className={styles.BarSearch}
            placeholder="Pesquisar"
            onChange={(e) => setName(e.target.value)}
          />
        </form>

        <div className={styles.NavBarLog}>
          <button className={styles.BtnRegister} onClick={logOut}>
            Sair
          </button>

          {/* Exibe o e-mail do usuário */}
          <div>
            {userEmail ? (
              <h2>Seu e-mail é: {userEmail}</h2>
            ) : (
              <p>Carregando e-mail...</p>
            )}
          </div>
        </div>
      </div>

      {/* Card dos Jogos */}
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}></div>
      </div>

      <div className={styles.rightContainer}>
        {data && Array.isArray(data) ? (
          data.map((Game: any) => (
            <div
              key={Game.id}
              onClick={() => gameClick(Game.name, Game.id)}
              className={styles.card}
            >
              <img
                src={Game.imageURL}
                className={styles.cardImg}
                alt={Game.name}
              />
              <div className={styles.cardInfos}>
                <h2>{Game.name}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>No Games Found</p>
        )}
      </div>
    </main>
  );
}

// Função para proteger a rota e verificar o token
export function getServerSideProps({ req, res }: any) {
  try {
    const token = getCookie("authorization", { req, res });

    if (!token) {
      throw new Error("Invalid Token");
    } else {
      checkToken(token);
    }

    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/user/login",
      },
      props: {},
    };
  }
}

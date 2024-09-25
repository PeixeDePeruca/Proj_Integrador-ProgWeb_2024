import React, { useEffect, useState } from 'react';
import styles from "@/styles/favorites.module.css";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { checkToken } from '@/services/tokenConfig';

type Game = {
  id: number;
  name: string;
  imageURL: string;
};

export default function Favorite() {
  const [favorites, setFavorites]:Array<any> = useState([]);
  const router = useRouter();

  async function fetchFavorites() {

    const cookieAuth = getCookie('authorization');

    const checkAuth = checkToken(cookieAuth);

    const response = await fetch(`/api/action/favorite/select?email=${checkAuth.email}`);
    const data = await response.json();
    console.log(data.favorites); // Log para verificar a resposta
    setFavorites(data.favorites);

  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <main className={styles.container}>
      <h1>Página de Favoritos</h1>
      <div>
        {favorites != undefined ? (
          favorites.map((favorite:any) => (
            <div className={styles.favoriteItem}>
              <img src={favorite.game.imageURL} />
              <h2>{favorite.game.name}</h2>
              <button onClick={() => router.push(`/game/${favorite.game.name}`)}>Ver Jogo</button>
            </div>
          ))
        ) : (
          <p>Você não tem jogos favoritos ainda.</p>
        )}
      </div>
    </main>
  );
}

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/game.module.css';
import { getCookie } from 'cookies-next';
import { checkToken } from '@/services/tokenConfig';
import axios from 'axios';

type RatingForm = {
  value: number;
  comment: string;
};

type Rating = {
  value: number;
  comment: string;
  user: { username: string };
};

export default function GameComponent({ gameName }: { gameName: string }) {
  const router = useRouter();

  const [ratingForm, setRatingForm] = useState<RatingForm>({ value: 0, comment: '' });
  const [data, setData] = useState<GameData | undefined>(undefined);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  function handleFormEdit(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) {
    setRatingForm({ ...ratingForm, [field]: event.target.value });
  }

  async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const cookieAuth = getCookie('authorization');
      const tokenInfos = checkToken(cookieAuth);

      const response = await fetch(`/api/action/rating/create`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          value: Number(ratingForm.value),
          comment: ratingForm.comment,
          email: tokenInfos.email,
          gameName
        })
      });

      const responseJson = await response.json();
      alert(responseJson.message);
      router.reload();
    } catch (err) {
      console.log(err);
      alert('Erro ao enviar o comentário.');
    }
  }

  async function fetchData() {
    try {
      const response = await fetch(`/api/action/game/find?name=${gameName}`);
      const responseJson = await response.json();
      setData(responseJson.data);
    } catch (err) {
      console.log(err);
      alert('Erro ao buscar dados do jogo.');
    }
  }

  type GameData = {
    id: string;
    name: string;
    releaseDate: string;
    description: string;
    genres: { name: string }[];
    imageURL: string;
    imageGames: { name: string }[];
    videoURL: string;
    downloads: { name: string }[];
    ratings: Rating[];
  };

  useEffect(() => {
    fetchData();
  }, [gameName]);

  async function deleteComment() {
    try {
      const cookieAuth = getCookie('authorization');
      const tokenInfos = checkToken(cookieAuth);

      const response = await fetch(`/api/action/rating/delete`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          email: tokenInfos.email,
          gameName
        })
      });

      const responseJson = await response.json();
      alert(responseJson.message);
      router.reload();
    } catch (err) {
      console.log(err);
      alert('Erro ao excluir o comentário.');
    }
  }

  function handleButtonHomePage() {
    router.push("/user/login");
  }

  function handleButtonDownload(download: string) {
    router.push(download);
  }

  const toggleZoom = (index: number) => {
    setZoomedImageIndex(zoomedImageIndex === index ? null : index);
  };

  return (
    <main id={styles.main} className="flex min-h-screen flex-col">
      {data ? (
        <div className={styles.page}>
          <div className={styles.ContainerTales}>
            <h1 className={styles.TalesHomeBtn} onClick={handleButtonHomePage}>Tales News</h1>
            <input className={styles.BarSearch} type="text" placeholder='Pesquisar' />
            {/*<button onClick={toggleFavorite}>
              {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            </button>*/}
          </div>
          <div className={styles.game}>
            <img src={data.imageURL} alt={data.name} className={styles.img} />
            <div className={styles.gameInfos}>
              <h2>{data.name}</h2>
              <p>Data de lançamento: {data.releaseDate}</p>
              <p>Descrição: {data.description}</p>
              <p>Gêneros:
                {data.genres?.length > 0 ? (
                  data.genres.map((genre) => (
                    <span className={styles.gameGenre} key={genre.name}>{genre.name}</span>
                  ))
                ) : (
                  "Sem Gêneros"
                )}
              </p>

              <div className={styles.ContainerDownloadImage}>
                {data.imageGames?.length > 0 ? (
                  data.imageGames.map((imageGame, index) => (
                    <div key={index} className={styles.imageContainer}>
                      <img
                        src={imageGame.name}
                        alt={`Imagem adicional ${index + 1}`}
                        className={zoomedImageIndex === index ? styles.ImgGameZoomed : styles.ImgGame}
                        onClick={() => toggleZoom(index)}
                      />
                    </div>
                  ))
                ) : (
                  <p>Sem imagens adicionais disponíveis</p>
                )}

                {zoomedImageIndex !== null && (
                  <button className={styles.closeButton} onClick={() => setZoomedImageIndex(null)}>X</button>
                )}

                {data.downloads?.length > 0 ? (
                  data.downloads.map((download) => (
                    <div className={styles.ContainerDownload} onClick={() => handleButtonDownload(download.name)} key={download.name}>
                      <h3 className={styles.BtnDownload}>Download</h3>
                      <span className={styles.TextDownload}>para Windows</span>
                      <img className={styles.imgDownload} src="/download-3_icon-icons.webp" alt="" />
                    </div>
                  ))
                ) : (
                  <p>Downloads não disponíveis</p>
                )}
              </div>
            </div>
          </div>

          <iframe className={styles.video} height="800" src={`https://www.youtube.com/embed/${data.videoURL}`}></iframe>

          <h1 className={styles.ratingtitle}>Avaliações</h1>

          <form className={styles.formRating} onSubmit={formSubmit}>
            <div className={styles.star_rating}>
              {[5, 4, 3, 2, 1].map((star) => (
                <React.Fragment key={star}>
                  <input
                    className={styles.radio_hide}
                    type="radio"
                    id={`star_${star}`}
                    name="stars"
                    value={star}
                    onChange={(e) => handleFormEdit(e, 'value')}
                  />
                  <label className={styles.radio_star} htmlFor={`star_${star}`}></label>
                </React.Fragment>
              ))}
            </div>

            <textarea
              onChange={(e) => handleFormEdit(e, 'comment')}
              className={styles.comment}
              placeholder='Digite seu Comentário'
              value={ratingForm.comment}
            /><br />
            <input className={styles.submitBtn} type="submit" />
            <br /><br />
            <button onClick={deleteComment} className={styles.submitBtn}>Excluir Comentário</button>
          </form>

          <div className={styles.ratings}>
            {data.ratings?.length > 0 ? (
              data.ratings.map((rating) => (
                <div className={styles.ratingCard} key={rating.user.username}>
                  <div className={styles.rInfos}>
                    <label className={styles.rUser}>Comentário feito por: {rating.user.username}</label>
                    <label className={styles.rValue}>{rating.value} /5 Recomendação</label><br />
                  </div>
                  <div className={styles.rComment}>
                    <label>{rating.comment}</label>
                  </div>
                </div>
              ))
            ) : (
              <p>Sem avaliações disponíveis</p>
            )}
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      ) : (
        <p>Erro 404 Jogo não encontrado</p>
      )}
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const { gameName } = context.query;

  return {
    props: { gameName }
  };
}

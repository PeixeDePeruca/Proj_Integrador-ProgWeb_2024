import styles from "@/styles/homePage.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { checkToken } from "@/services/tokenConfig";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { prisma } from "@/db";
import select from "./api/action/game/select";

export default function Home() {
  const router = useRouter();
  const [data, setData]: any = useState(undefined);
  const [saveData, setSaveData]: Array<any> = useState(undefined);
  const [name, setName] = useState("");

  function searchFilter(array: any, text: string) {
    if (text == "") {
      return array;
    } else {
      return array.filter((singleGame: any) =>
        singleGame.name.toLowerCase().includes(text.toLowerCase())
      );
    }
  }

  function formSubmit(event: any) {
    event.preventDefault();
    try {
      const filteredGames = searchFilter(saveData, name);
      setData(filteredGames);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchData() {
    try {
      const response = await fetch(`/api/action/game/select`, {
        method: "GET",
      });

      const responseJson = await response.json();

      setData(responseJson.data);
      setSaveData(responseJson.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function logOut() {
    deleteCookie("authorization");
    router.push(`/user/login`);
  }

  function gameClick(gameName: string) {
    router.push(`/game/` + gameName);
  }

  function iconClick() {
    router.push(`/`);
    router.reload();
  }

  function dateFormat(_date: string) {
    // data esperada: 2024-09-12T17:19
    const [date, time] = _date.split("T");
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  }


  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title} onClick={logOut}>Tales News</h1>

        <a href="" className={styles.p}>
          Inicio
        </a>
        <Link href={`/game/create`} className={styles.p}>
          Adicionar Jogos
        </Link>
        <a href="" className={styles.p}>
          Gêneros
        </a>

        <div className={styles.NavBarSearch}>
          <img src="" alt="" />
          <input
            type="text"
            className={styles.BarSearch}
            placeholder="Pesquisar"
          />
        </div>

        <div className={styles.NavBarLog}>
          <label>Teste</label>
          <button className={styles.BtnRegister} onClick={logOut}>
            Sair
          </button>
        </div>
      </div>

      {/* Card dos Jogos Arrumar Home Page */}
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}></div>
      </div>

      <div className={styles.rightContainer}>
        {data != undefined && Array.isArray(data) ? (
          data.map((Game: any) => (
            <div
              key={Game.name}
              onClick={() => {
                gameClick(Game.name);
              }}
              className={styles.card}
            >
              <img src={Game.imageURL} className={styles.cardImg} onClick={() => {gameClick(Game.name)}} alt="" />

              <div className={styles.cardInfos}>
                <h2>{Game.name}</h2>
                {/*<p>{dateFormat(Game.releaseDate)}</p>
                <p>{Game.genre}</p>
                <p>{Game.description}</p>*/}
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

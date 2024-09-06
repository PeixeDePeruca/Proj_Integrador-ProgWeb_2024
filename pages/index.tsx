import styles from "@/styles/homePage.module.css";
import React from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  function handleBottonRouterRegister(){
    router.push('/user/register')
  };

  function handleBottonRouter(){
    router.push('/user/login')
  }

  return (
    <main className={styles.container}>
      <div className={styles.container2}>
        <img src="/super-mario.jpg" className={styles.imgMario} alt="" /> 
        <h1 className={styles.title}>BielzinhoGamer Noticias</h1><br /><br />
      </div>

      <br />
      <div className={styles.SideMain}>
        <ul className={styles.sidebar}>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/path/to/inicio-icon.png" alt="Início" />
            <span className={styles.text}>Início</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/PS5.icon.png" alt="PS5" />
            <span className={styles.text}>PS5</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/588257.png" alt="XBOX" />
            <span className={styles.text}>XBOX</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/path/to/switch-icon.png" alt="Switch" />
            <span className={styles.text}>Switch</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/path/to/reviews-icon.png" alt="Reviews" />
            <span className={styles.text}>Reviews</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/path/to/cinema-icon.png" alt="Cinema & TV" />
            <span className={styles.text}>Cinema & TV</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/path/to/anime-icon.png" alt="Anime" />
            <span className={styles.text}>Anime</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/path/to/tech-icon.png" alt="Tech" />
            <span className={styles.text}>Tech</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/path/to/descontos-icon.png" alt="Descontos" />
            <span className={styles.text}>Descontos</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/path/to/videos-icon.png" alt="Videos" />
            <span className={styles.text}>Videos</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/path/to/galerias-icon.png" alt="Galerias" />
            <span className={styles.text}>Galerias</span>
          </li>
          <li className={styles.menuItem}>
            <img className={styles.icon} src="/path/to/ver-mais-icon.png" alt="Ver Mais" />
            <span className={styles.text}>Ver Mais</span>
          </li>
        </ul>
      </div>

      <br /><br />
      <div className={styles.NavSeachBar}>
        <img className={styles.lupa} src="/lupa.jpg" alt="" />
        <input className={styles.SearchBar} type="text" placeholder="Pesquisar Jogos"/>
      </div>
      

      <br /><br />
    
    <div className={styles.container3}>
    <div className={styles.regionWrapper}>
      <label className={styles.regionLabel}>Change Region:</label>
      <select className={styles.regionSelect} name="pais" id="pais">
        <option value="vazio"></option>
        <option value="brasil">Brasil</option>
        <option value="franca">France</option>
        <option value="estados-unidos">United States</option>
        <option value="alemanha">Deutschland</option>
        <option value="russia">Россия</option>
      </select>
    </div>

      <br /><br />
      
      <div>
        <button className={styles.BtnLogin}>Entrar</button>
        <button className={styles.BtnRegister} onClick={handleBottonRouterRegister}>Registrar</button> 
      </div>
    </div>

    </main>
  );
}

import { checkToken } from '@/services/tokenConfig';
import styles from '@/styles/game.module.css'
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function game({ gameName }: any) {
    const router = useRouter();

    // Formulário de avaliação
    const [ratingForm, setRatingForm] = useState(
        {
            value: 0,
            comment: ''
        }
    );

    const [data, setData]: any = useState(undefined);


    function handleFormEdit(event: any, field: string) {
        setRatingForm({
            ...ratingForm,
            [field]: event.target.value
        });
        console.log(ratingForm)
    }

    async function formSubmit(e: any) {
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
                    gameName: gameName
                })
            });

            const responseJson = await response.json();

            alert(responseJson.message);
            router.reload();

        }
        catch (err) {
            console.log(err);
            alert(err);
        }
    }


    async function fetchData() {
        try {
            const response = await fetch(`/api/action/game/find?name=` + gameName, {
                method: 'GET'
            });

            const responseJson = await response.json();

            setData(responseJson.data);
        }
        catch (err) {
            console.log(err);
            alert('Algo deu Errado');
        }
    }

    useEffect(() => {

        fetchData();

    }, [])


    async function deleteComment(event:any) {
        event.preventDefault();
        try {

            const cookieAuth = getCookie('authorization');

            const tokenInfos = checkToken(cookieAuth);

            const response = await fetch(`/api/action/rating/delete`, {
                method: 'DELETE',
                headers: { 'Content-type' : 'application/json' },
                body: JSON.stringify({
                    email: tokenInfos.email,
                    gamename: gameName
                })
            });

            const responseJson = await response.json();

            alert(responseJson.message);
            router.reload();

        }
        catch (err) {
            console.log(err);
        }
    }

    function handleButtonHomePage() {
        router.push("/user/login")
    }

    function handleButtonDownload() {
        router.push("https://grand-theft-auto-san-andreas-game.softonic.com.br/")
    }
    

    return (
        <main id={styles.main} className="flex min-h-screen flex-col">
            {
                data != undefined ?

                    <div className={styles.page}>
                        <div className={styles.ContainerTales}>
                            <h1 className={styles.TalesHomeBtn} onClick={handleButtonHomePage}>Tales News</h1>
                            <input className={styles.BarSearch} type="text" placeholder='Pesquisar' />
                        </div>
                        <div className={styles.game}>
                            <img src={data.imageURL} alt="" className={styles.img} />
                            <div className={styles.gameInfos}>
                                <h2>{data.name}</h2>
                                <p>Data de lançamento: {data.releaseDate}</p>
                                <p> Descrição: {data.description}</p>
                                <p>Generos: "Violência" e "Muito Legal"</p>

                                <div className={styles.ContainerDownload} onClick={handleButtonDownload}>
                                    <h3 className={styles.BtnDownload}>Download </h3>
                                    <a className={styles.TextDownload}>para Windows</a>
                                    <img className={styles.imgDownload} src="/download-3_icon-icons.webp" alt="" />
                                </div>
                            </div>
                        </div>

                        <iframe className={styles.video} height="800" src={`https://www.youtube.com/embed/` + data.videoURL}>
                        </iframe>

                        <form className={styles.formRating} onSubmit={formSubmit}>

                            <div className={styles.star_rating}>

                                <input className={styles.radio_hide} type="radio" id='star_5' name='stars' value='5' onChange={(e) => { handleFormEdit(e, 'value') }} />
                                <label className={styles.radio_star} htmlFor='star_5' ></label>

                                <input className={styles.radio_hide} type="radio" id='star_4' name='stars' value='4' onChange={(e) => { handleFormEdit(e, 'value') }} />
                                <label className={styles.radio_star} htmlFor='star_4' ></label>

                                <input className={styles.radio_hide} type="radio" id='star_3' name='stars' value='3' onChange={(e) => { handleFormEdit(e, 'value') }} />
                                <label className={styles.radio_star} htmlFor='star_3' ></label>

                                <input className={styles.radio_hide} type="radio" id='star_2' name='stars' value='2' onChange={(e) => { handleFormEdit(e, 'value') }} />
                                <label className={styles.radio_star} htmlFor='star_2' ></label>

                                <input className={styles.radio_hide} type="radio" id='star_1' name='stars' value='1' onChange={(e) => { handleFormEdit(e, 'value') }} />
                                <label className={styles.radio_star} htmlFor='star_1' ></label>


                            </div>


                            <textarea onChange={(e) => { handleFormEdit(e, 'comment') }} className={styles.comment} placeholder='Digite seu Comentário' ></textarea><br />
                            <input className={styles.submitBtn} type="submit" />
                            
                            
                            <br /><br />
                            <button onClick={deleteComment} className={styles.submitBtn}>Excluir Comentário</button>
                        </form>

                        <div className={styles.ratings}>

                            {

                                data.ratings.map((rating: any) => (

                                    <div className={styles.ratingCard}>
                                        <div className={styles.rInfos}>
                                            <label className={styles.rUser}>Comentario feito por: {rating.user.username} </label>
                                            <label className={styles.rValue}> {rating.value} /5 Recomendação</label><br />
                                        </div>
                                        <div className={styles.rComment}>
                                            <label>{rating.comment}</label>


                                            
                                        </div>
                                        
                                    </div>


                                ))


                            }

                        </div>
                    </div>

                    :

                    <p>Erro 404 Filme não encontrado</p>

            }
        </main>
    );
}


export function getServerSideProps(context: any) {

    const { gameName } = context.query;

    return {
        props: { gameName }
    }
}
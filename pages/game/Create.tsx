import Head from "next/head";
import styles from "@/styles/createGame.module.css";
import { useState, useEffect } from "react";

export default function CreateGame() {
    const [imageUpload, setImageUpload] = useState(undefined);

    const [genres, setGenres]: any = useState(undefined);

    var selectedGenres: Array<string> = [];

    const [formData, setFormData] = useState({
        name: '',
        releaseDate: '',
        imageURL: '',
        videoURL: '',
        description: ''
    });

    function handleCheckboxEdit(event: any, name: string) {
        if (event.target.checked) {
            selectedGenres.push(name);
        }
        else {
            const index = selectedGenres.indexOf(name);

            if (index != undefined)
                selectedGenres.splice(index, 1);
        }
    }

    async function fetchData() {
        try {
            const response = await fetch(`/api/action/genre/select`, {
                method: 'GET'
            });

            const responseJson = await response.json();

            setGenres(responseJson.data);

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();

    }, []);

    function handleImageEdit(event: any) {
        setImageUpload(event.target.files[0]);
    }

    function handleFormEdit(event: any, field: string) {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    }

    async function formSubmit(event: any) {
        event.preventDefault();

        if (imageUpload === undefined) {
            await gameSubmit(formData);
            return;
        }

        try {
            const img = new FormData();
            img.append("image", imageUpload);

            const response = await fetch(`/api/action/game/createImage`, {
                method: 'POST',
                body: img
            });

            const responseJson = await response.json();

            if (response.status !== 200) {
                alert(responseJson.message);
            } else {
                await gameSubmit(formData, responseJson.secure_url);
            }
        } catch (err) {
            alert(err);
        }
    }

    async function gameSubmit(data: any, img = "") {
        try {
            const response = await fetch(`/api/action/game/create`, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    releaseDate: data.releaseDate,
                    description: data.description,
                    videoURL: data.videoURL,
                    imageURL: img
                })
            });

            const responseJson = await response.json();
            alert(`${responseJson.message}`);
        } catch (err) {
            alert(err);
        }
    }

    return (
        <main className={styles.main}>
            <Head>
                <title>Página para o Cadastro de Jogos</title>
            </Head>
            <p className={styles.p}>a</p>
            <div>
                <form className={styles.formContainer} onSubmit={formSubmit}>
                    <h1 className={styles.title}>Tales News</h1>
                    {/* Adicione os campos do formulário aqui */}
                    <br />
                    <input
                        type="text"
                        className={styles.input}
                        value={formData.name}
                        onChange={(e) => handleFormEdit(e, 'name')}
                        placeholder="Nome do jogo"
                    />
                    <br />
                    <input
                        type="date"
                        className={styles.inputDate}
                        value={formData.releaseDate}
                        onChange={(e) => handleFormEdit(e, 'releaseDate')}
                        placeholder="Data de lançamento"
                    />
                    <br />
                    <input
                        type="text"
                        className={styles.input}
                        value={formData.videoURL}
                        onChange={(e) => handleFormEdit(e, 'videoURL')}
                        placeholder="URL do vídeo"
                    />
                    <br />
                    <textarea
                        className={styles.input}
                        value={formData.description}
                        onChange={(e) => handleFormEdit(e, 'description')}
                        placeholder="Descrição do jogo"
                    />
                    <br />
                    <input
                        className={styles.inputFile}
                        type="file" onChange={handleImageEdit} />
                    <br />
                    <input className={styles.InputGenre} type="check box" />
                    <br />
                    <div>
                        {
                            genres != undefined && genres instanceof Array ?

                                genres.map(genre => (

                                    <div className={styles.checkboxBox}>
                                        <input type="checkbox" onChange={(e) => { handleCheckboxEdit(e, genre.name) }} />
                                        <label>{genre.name}</label>
                                    </div>

                                ))

                                :

                                <p>No genres</p>
                        }
                    </div>
                    <br />
                    <button
                        className={styles.BtnSend} 
                        type="submit">Enviar</button>
                    <br />
                </form>
            </div>
        </main>
    );
}

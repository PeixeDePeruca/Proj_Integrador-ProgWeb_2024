import Head from "next/head";
import styles from "@/styles/createGame.module.css";
import { useState } from "react";

export default function CreateGame() {
    const [imageUpload, setImageUpload] = useState(undefined);

    const [formData, setFormData] = useState({
        name: '',
        releaseDate: '',
        imageURL: '',
        videoURL: '',
        description: ''
    });

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
            <div>
                <form className={styles.formContainer} onSubmit={formSubmit}>
                    <h1>Fazer a Interface da Página de Criação de Jogos</h1>
                    {/* Adicione os campos do formulário aqui */}
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleFormEdit(e, 'name')}
                        placeholder="Nome do jogo"
                    />
                    <input
                        type="date"
                        value={formData.releaseDate}
                        onChange={(e) => handleFormEdit(e, 'releaseDate')}
                        placeholder="Data de lançamento"
                    />
                    <input
                        type="text"
                        value={formData.videoURL}
                        onChange={(e) => handleFormEdit(e, 'videoURL')}
                        placeholder="URL do vídeo"
                    />
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleFormEdit(e, 'description')}
                        placeholder="Descrição do jogo"
                    />
                    <input type="file" onChange={handleImageEdit} />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </main>
    );
}

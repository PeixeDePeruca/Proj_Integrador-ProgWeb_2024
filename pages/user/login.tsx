import Head from "next/head";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { checkToken } from "@/services/tokenConfig";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleFormEdit(event: any, field: string) {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    }

    async function formSubmit(event: any) {
        event.preventDefault();

        try {
            const response = await fetch(`/api/action/user/login`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const responseJson = await response.json();

            alert(`${responseJson.message}`);

            if (response.status === 200) {
                setCookie('authorization', responseJson.token);
                router.push(`/`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>
            <h1 className={styles.title}>Faça Login</h1>

            <br /><br />

            <p>Insira seu e-mail e verificaremos se você já tem uma conta. <br />Caso contrário, criaremos uma nova.</p>

            <br />

            <div>
                <form onSubmit={formSubmit}>
                    <span className={styles.formspan}>Ou faça login com nome de usuário</span>
                    <input
                        className={styles.forminput}
                        type="email"
                        placeholder="Login"
                        onChange={(event) => { handleFormEdit(event, 'email') }}
                    /><br /><br />
                    <input
                        className={styles.InputPassword}
                        type="password"
                        placeholder="Senha"
                        onChange={(event) => { handleFormEdit(event, 'password') }}
                    /><br /><br /><br />
                    <input
                        className={styles.BntLogin}
                        type="submit"
                        value="Entrar"
                    />
                    <br />
                    {/*<Link href={`/user/register`}>Criar Conta</Link>*/}
                </form>
            </div>

            <br />

            <p>Ou continue com</p>

            <div className={styles.container2}>
                <img className={styles.IconFacebook} src="/Facebook_Icon.png" alt="Facebook" />
                <img className={styles.IconGoogle} src="/Google_Icon.jfif" alt="Google" />
            </div>
        </main>
    );
}

export async function getServerSideProps({ req, res }: any) {
    try {
        const token = getCookie('authorization', { req, res });

        if (!token) {
            throw new Error('Invalid Token');
        } else {
            checkToken(token);
        }

        return {
            redirect: {
                permanent: false,
                destination: '/'
            },
            props: {}
        }
    } catch (err) {
        return {
            props: {}
        }
    }
}

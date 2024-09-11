import Head from "next/head";
import Link from "next/link";
import styles from '@/styles/register.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getCookie } from "cookies-next"; 
import { checkToken } from "@/services/tokenConfig"; 


export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        cPassword: ""
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
            const response = await fetch(`/api/action/user/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const responseJson = await response.json();

            alert(`${responseJson}`);

            if (response.status === 201) {
                router.push(`/user/login`);
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main>
            <form className={styles.container} onSubmit={formSubmit}>
                <br />
                <h1 className={styles.title}>Cadastre-se Gratuitamente</h1>
                <br />
                <p>Insira seu e-mail e verificaremos se você já tem uma conta. <br />Caso contrário, criaremos uma nova.</p>
                <br />
                <div>
                    <input
                        className={styles.formNameInput}
                        type="text"
                        placeholder='Nome'
                        onChange={(event) => handleFormEdit(event, 'name')}
                    />
                </div>
                <br />
                <div>
                    <input
                        type="text"
                        placeholder='Email'
                        className={styles.forminput}
                        onChange={(event) => handleFormEdit(event, 'email')}
                    />
                </div>
                <br />
                <div>
                    <input
                        type="text"
                        className={styles.InputPassword}
                        placeholder='UserName'
                        onChange={(event) => handleFormEdit(event, 'username')}
                    />
                </div>
                <br />
                <div>
                    <input
                        type="password"
                        className={styles.InputConfirmPassword}
                        placeholder='Senha'
                        onChange={(event) => handleFormEdit(event, 'password')}
                    />
                </div>
                <br />
                <div>
                    <input
                        type="password"
                        className={styles.InputConfirmPassword}
                        placeholder='Confirmação de senha'
                        onChange={(event) => handleFormEdit(event, 'cPassword')}
                    />
                </div>
                <br /><br />
                <button className={styles.BntRegister}>Criar sua Conta</button>
                <br />
                <p>Ou continue com</p>
                <div className={styles.container2}>
                    <img className={styles.IconFacebook} src="/Facebook_Icon.png" alt="" />
                    <img className={styles.IconGoogle} src="/Google_Icon.jfif" alt="" />
                </div>
            </form>
        </main>
    );
}

export function getServerSideProps({ req, res }: any) {
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
        };
    } catch (err) {
        return {
            props: {}
        };
    }
}

import Head from "next/head";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import { setCookie , getCookie } from "cookies-next";
import { checkToken } from "@/services/tokenConfig";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();

    const [ formData , setFormData ] = useState({
        email: '',
        password: ''
    });

    function handleFormEdit(event:any , field:string) {
        setFormData({
            ...formData,
            [field] : event.target.value
        });
    }

    async function formSubmit(event:any) {
        event.preventDefault();

        try{
            const response = await fetch(`/api/action/user/login` , {
                method: 'POST',
                headers: { 'Content-type' : 'application/json' },
                body: JSON.stringify(formData)
            });

            const responseJson = await response.json();

            alert(`${responseJson.message}`);

            if ( response.status == 200 ) {
                setCookie('authorization' , responseJson.token);

                router.push(`/`);
            }

        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <main className={styles.body}>
            <Head>
                <title>Login</title>
            </Head>

            <h1 className={styles.text}>Página de Login</h1>

            <form className={styles.container} onSubmit={formSubmit}>
                <br /><h1 className={styles.Login}>Login</h1><br />

                <br /><input className={styles.input} type="text" placeholder="Login" onChange={(event) => {handleFormEdit(event , 'email')}} /><br />
                <br /><input className={styles.input} type="text" placeholder="Senha" onChange={(event) => {handleFormEdit(event , 'password')}} /><br />

                <br /><input className={styles.sendBtn} type="submit" value="Entrar" /><br />

                <br /><Link href={`/user/register`}>Cadastra-se</Link><br />
            </form>


        </main>
    );
}
export function getServerSideProps( { req , res }:any ) {
    try {
        const token = getCookie('authorization' , {req , res});

        if ( !token ) {
            throw new Error('Invalid Token');
        }
        else {
            checkToken(token);
        }

        return {
            redirect: {
                permanent: false,
                destination: '/'
            },
            props: {}
        }

    }
    catch(err){
        return {
            props: {}
        }
    }
}
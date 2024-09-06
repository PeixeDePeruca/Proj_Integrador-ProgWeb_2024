import styles from '@/styles/login.module.css'

export default function Login() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Faça Login</h1>

            <br />

            <p>Insira seu e-mail e verificaremos se você já tem uma conta. <br />Caso contrário, criaremos uma nova.</p>

            <br />


            <div>
                <label className={styles.formlabel}>Email</label>
                <span className={styles.formspan}>Ou faça login com nome de usuário</span>
                <br />
                <input type="text" placeholder='Email' className={styles.forminput} />
            </div>

            <br />

            <div>
                <label>Senha</label>
                <input type="text" className={styles.InputPassword} placeholder='Senha' />
            </div>

            <br />

            <button className={styles.BntRegister}>Entrar</button>
        </main>
    )
}
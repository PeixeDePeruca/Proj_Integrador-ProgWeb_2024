import styles from '@/styles/register.module.css'

export default function Register() {
    return(
        <main>
            <div className={styles.container}>
                <h1 className={styles.title}>Cadastre-se gratuitamente ou faça login</h1>

                    <br /><br />

                <p>Insira seu e-mail e verificaremos se você já tem uma conta. <br />Caso contrário, criaremos uma nova.</p>

                    <br /><br />

                <div className={styles.formgroup}>
                    <label className={styles.formlabel}>Email</label>
                    <span className={styles.formspan}>Ou faça login com nome de usuário</span>
                    <br />
                    <input type="text" className={styles.forminput} />
                </div>

                <br /><br />
                
                <button className={styles.BntRegister}>Continuar com Email</button>

                <br /><br />
                
                <p>Ou continue com</p>

                <div className={styles.container2}>
                    <img className={styles.IconFacebook} src="/Facebook_Icon.png" alt="" />
                    <img className={styles.IconGoogle} src="/Google_Icon.jfif" alt="" />
                </div>
            </div> 
        </main>
    );
}
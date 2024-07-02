export default function LoginPage() {
    return <>
        <form>
            <div>
                <label>Email:</label>
                <input/>
            </div>
            <div>
                <label>Senha:</label>
                <input type="password" />
            </div>
            <div>
                <button type="submit">Entrar</button>
            </div>
        </form>
    </>
}
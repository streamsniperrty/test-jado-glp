export default function Login() {
    return (
        <main>
            <h1>Operation _____: USSF Control Panel</h1>
            <h2>Login</h2>

            <form>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                />

                <br />
                <br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                />

                <br />
                <br />

                <button type="submit">Sign In</button>
            </form>
        </main>
    );
}

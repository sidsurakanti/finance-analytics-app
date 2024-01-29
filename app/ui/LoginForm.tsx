'use client'

export default function LoginForm () {
    // TODO: add form state (maybe use a reducer)
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                placeholder="Username"
            >
            </input>
            <input
                type="text"
                placeholder="Email"
            >
            </input>
            <input
                type="text"
                placeholder="Password"
            >
            </input>
            <input 
                type="submit">
            </input>
        </form>
    )
}
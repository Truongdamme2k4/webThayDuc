import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [info, setInfo] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleRegister = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            });
            if (res.ok) {
                alert("Register success!");
                navigate("/login");
            } else {
                const data = await res.json();
                console.log(data);
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setError("Server error!");
        }
    }
    return (
        <>
            <h1>Register</h1>
            <label>Username</label>
            <input onChange={(e) => setInfo({ ...info, username: e.target.value })} type="text" />
            <label>Password</label>
            <input onChange={(e) => setInfo({ ...info, password: e.target.value })} type="password" />
            <button onClick={handleRegister} style={{ margin: 10 }}>Register</button>
            {error && <p>{error}</p>}
        </>
    );
}
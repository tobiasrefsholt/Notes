import React, { useState } from 'react';
import Cookies from 'js-cookie';

function LoginForm() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleemailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify({ email, password }));
    console.log("Logging in...")

    const response = await fetch("http://localhost:5214/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json();

    console.log(response);

    if (response.ok) {
      console.log(data);
      const token = data?.accessToken;

      if (token !== null) {
        Cookies.set('token', token, { secure: false });
      } else {
        Cookies.remove('token');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={handleemailChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export { LoginForm }
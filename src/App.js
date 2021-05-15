import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import cw from "./assets/cw.svg";
import man from "./assets/man.svg";
import woman from "./assets/woman.svg";
import email from "./assets/mail.svg";
import oldman from "./assets/growing-up-man.svg";
import oldwoman from "./assets/growing-up-woman.svg";
import location from "./assets/map.svg";
import phone from "./assets/phone.svg";
import password from "./assets/padlock.svg";
import design from "./assets/design.svg";

function App() {
  const [user, setUser] = useState([]);

  const newUser = (e) => {
    if (e) e.target.innerHTML = "LOADING...";

    axios
      .get("https://randomuser.me/api/")
      .then((response) =>
        response.data.results.map((user) => ({
          id: `${user.login.uuid}`,
          image: `${user.picture.large}`,
          gender: `${user.gender}`,
          name: `${user.name.first} ${user.name.last}`,
          email: `${user.email}`,
          age: `${user.dob.age}`,
          street: `${user.location.street.number} ${user.location.street.name}`,
          phone: `${user.phone}`,
          password: `${user.login.password}`,
        }))
      )
      .then((data) => {
        setUser(data);
        const p = document.querySelector(".user-data__title");
        p.innerHTML = "My name is";
        if (e) e.target.innerHTML = "NEW USER";
      })
  };

  const showData = (e) => {
    const p = document.querySelector(".user-data__title");
    const h1 = document.querySelector(".user-data__info");
    p.innerHTML = `My ${e.target.className} is`;
    h1.innerHTML = user[0][e.target.className];
  };

  const addUser = () => {
    const table = document.querySelector("table");
    table.style.display = "block";
    const tbody = document.querySelector("tbody");
  };

  useEffect(newUser, []);

  return (
    </div>
  );
}

export default App;

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

    const row = document.createElement("tr");
    const rowData1 = document.createElement("td");
    const rowData2 = document.createElement("td");
    const rowData3 = document.createElement("td");
    const rowData4 = document.createElement("td");

    rowData1.innerHTML = user[0].name;
    rowData2.innerHTML = user[0].email;
    rowData3.innerHTML = user[0].phone;
    rowData4.innerHTML = user[0].age;

    row.appendChild(rowData1);
    row.appendChild(rowData2);
    row.appendChild(rowData3);
    row.appendChild(rowData4);

    !tbody.classList.contains(`${user[0].id}`) && tbody.append(row);
    tbody.classList.add(`${user[0].id}`);
  };

  useEffect(newUser, []);

  return (
    <div className="App">
      <img src={cw} alt="Clarusway Logo" className="cw-logo" />
      {user.map((the_user) => (
        <div key="user-key" className="user-info">
          <img src={the_user.image} alt="User Profile" className="user-image" />
          <div className="user-data">
            <p className="user-data__title"></p>
            <h1 className="user-data__info">{the_user.name}</h1>
          </div>
          <div className="icons">
            {the_user.gender === "female" ? (
              <img
                src={woman}
                alt="Man Icon"
                className="name"
                onMouseOver={showData}
              />
            ) : (
              <img
                src={man}
                alt="Woman Icon"
                className="name"
                onMouseOver={showData}
              />
            )}
            <img
              src={email}
              alt="Email Icon"
              className="email"
              onMouseOver={showData}
            />
            {the_user.gender === "female" ? (
              <img
                src={oldwoman}
                alt="Old Woman Icon"
                className="age"
                onMouseOver={showData}
              />
            ) : (
              <img
                src={oldman}
                alt="Old Man Icon"
                className="age"
                onMouseOver={showData}
              />
            )}
            <img
              src={location}
              alt="Location Icon"
              className="street"
              onMouseOver={showData}
            />
            <img
              src={phone}
              alt="Phone Icon"
              className="phone"
              onMouseOver={showData}
            />
            <img
              src={password}
              alt="Password Icon"
              className="password"
              onMouseOver={showData}
            />
          </div>
          <div className="buttons">
            <button
              className="new-user"
              onClick={newUser}
            >
              NEW USER
            </button>
            <button className="add-user" onClick={addUser}>
              ADD USER
            </button>
          </div>
          <table className="added-users">
            <thead>
              <tr>
                <th className="name-col">Name</th>
                <th className="email-col">Email</th>
                <th className="phone-col">Phone</th>
                <th className="age-col">Age</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      ))}
      <div className="designer">
        <span className="designer__name"><em>{String(`<ata/>`)}</em></span>
        <img src={design} alt="Design Icon" className="designer__icon" />
        <span className="designer__design">design</span>
      </div>
    </div>
  );
}

export default App;

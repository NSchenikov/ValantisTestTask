import { useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import "./App.css";

function App() {
  const baseUrl = "https://api.valantis.store:41000/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let now = new Date();
        let yyyy = now.getFullYear().toString();
        let mm =
          (now.getMonth() + 1).toString().length === 1
            ? "0" + (now.getMonth() + 1).toString()
            : (now.getMonth() + 1).toString();
        let dd =
          now.getDate().toString().length === 1
            ? "0" + now.getDate().toString()
            : now.getDate().toString();
        let date = yyyy + mm + dd;
        console.log(date);

        let password = "Valantis";
        let authString = md5(password + "_" + date);
        console.log(authString);
        const headers = {
          "X-Auth": authString,
          "Content-Type": "application/json",
        };

        const requestData = {
          "action": "get_ids",
          "params": { "offset": 10, "limit": 50 },
        };

        const response = await axios.post(baseUrl, requestData, {
          headers: headers,
        });

        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error(
            "Ошибка аутентификации: Некорректная авторизационная строка"
          );
        } else {
          console.error("Ошибка при получении данных: ", error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div>Hello World!</div>
    </div>
  );
}

export default App;

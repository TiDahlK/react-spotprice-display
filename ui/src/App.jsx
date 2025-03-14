import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import { getFromSessionStorage } from "./utils";
import "./App.css";

function App() {
  const [spotPrices, setSpotPrices] = useState(() =>
    getFromSessionStorage("spotPrices", null)
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpotPrice = async () => {
      try {
        if (spotPrices) {
          return;
        }

        const { data } = await axios.get(
          "http://localhost:7071/api/getSpotPrice"
        );
        setSpotPrices(data);
        window.sessionStorage.setItem("spotPrices", JSON.stringify(data));
      } catch (err) {
        console.log(err);
        setError("Kunde inte hämta spotpriser :(");
      } finally {
        setLoading(false);
      }
    };

    fetchSpotPrice();
  }, []);

  if (loading) return <h1>Laddar in dagens spotpriser...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <h1>Dagens spotpris</h1>
      <div className="container">
        {Object.entries(spotPrices).map(([area, info]) => (
          <Card key={area} {...info}></Card>
        ))}
      </div>
    </>
  );
}

export default App;

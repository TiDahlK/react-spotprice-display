import Card from "./components/Card";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpotPrice = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7071/api/getSpotPrice"
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch spot prices");
      } finally {
        setLoading(false);
      }
    };

    fetchSpotPrice();
  }, []);

  if (loading) return <h1>Loading spot prices...</h1>;
  if (error) return <h1>{error}</h1>;

  console.log(data);
  return (
    <>
      <h1>Dagens spotpris</h1>
      <div className="container">
        {Object.entries(data).map(([area, info]) => (
          <Card key={area} {...info}></Card>
        ))}
      </div>
    </>
  );
}

export default App;

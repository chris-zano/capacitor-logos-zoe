import { useEffect, useState } from "react";

function SpiritualLawsComponent() {
    const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      const data = await getSymbols();
      setSymbols(data);
    };

    fetchSymbols();
  }, []);

  if (!symbols || symbols.length === 0) {
    return null;
  }
  return (
    <div>SpiritualLawsComponent</div>
  )
}

export default SpiritualLawsComponent
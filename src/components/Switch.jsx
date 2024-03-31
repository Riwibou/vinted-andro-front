import { useState } from "react";
import Switch from "react-switch";

const Switcher = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };

  return (
    <div className="container-toggle">
      <span className="toggle-title">Trier par prix :</span>

      <span className="switch"><Switch onChange={handleChange} checked={checked} /></span>
    </div>
  );
};

export default Switcher

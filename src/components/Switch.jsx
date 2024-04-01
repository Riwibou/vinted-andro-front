import { useState } from "react";
import Switch from "react-switch";

const Switcher = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };
  const switchStyle = {
    // Define styles here
    backgroundColor: "#2CB1BA", // Change background color
    handleBorder: "0.5px solid #0d0d0d",
  };

  return (
    <div className="container-toggle">
      <span className="toggle-title">Trier par prix :</span>

      <span className="switch">
        <Switch
          onChange={handleChange}
          checked={checked}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20} // Change height
          width={48} // Change width
          handleDiameter={19.5} // Change handle diameter
          onColor="#2CB1BA" // Change color when checked
          offColor="#2CB1BA" // Change color when unchecked
          style={switchStyle} // Apply inline style
        />
      </span>
    </div>
  );
};

export default Switcher;

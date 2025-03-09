import React, { useState } from "react";
import PropTypes from "prop-types";

const ToggleSwitch = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (event) => {
    setIsChecked(event.target.checked);
    onChange(event.target.checked);
  };

  return (

   <div className="mx-5">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div
          className="min-w-12 min-h-7 bg-gray-300 relative peer-focus:outline-none rounded-full 
                     peer peer-checked:after:translate-x-5 peer-checked:after:border-white 
                     after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white 
                     after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                     after:transition-all peer-checked:bg-blue-600"
        ></div>
        <span className="ml-3 font-normal text-lg text-gray-500">
          Tính thời gian
        </span>
      </label>
   </div>
  );
};
ToggleSwitch.propTypes = {
  onChange: PropTypes.func,
};
export default ToggleSwitch;

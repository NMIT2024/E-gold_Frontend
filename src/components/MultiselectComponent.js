import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const MultiselectComponent = ({slectedJeweller}) => {
    const options = [
      { label: "JW1", value: "1" },
      { label: "JW2", value: "2"},
      { label: "JW3", value: "3" },
    ];
  
    const [selected, setSelected] = useState([]);

    useEffect(() => {
      slectedJeweller(selected)
    },[selected])
  
    return (
      <div>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={"Select Jeweller"}
        />
      </div>
    );
  }

export default MultiselectComponent;

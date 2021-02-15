import React, { useState, useRef, useEffect } from "react";
import Checkbox from "./Checkbox";
import useClickOutside from "../utils/useClickOutside";

function Dropdown({ multiselect = false, search = false, colorslist = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState(colorslist);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isSumbitted, setIsSumbitted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef();

  useEffect(() => {
    setColors(
      colorslist.filter((item) =>
        (typeof item === "object" ? item.title : item)
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
    );
  }, [searchText, colorslist]);

  // toggle dropdown
  const toggleDropdown = () => {
    if(search){
      setIsSumbitted(false)
    }

    setIsOpen((prev) => !prev);
  };
  const closeDropdown = ()=>{
      setIsOpen(false);
  }


  useClickOutside(dropdownRef, isOpen, closeDropdown);

  //   select colors
  const handleSelectColors = async (color = "") => {
    if (!color) return;
    let isColorExists = selectedColors.includes(color);
    // const firstElement =
    //   selectedColors && selectedColors.length > 0 && selectedColors[0];

    // if (typeof firstElement === "string") {
    //   if (selectedColors.includes(color)) {
    //     isColorExists = true;
    //   }
    // } else if (typeof firstElement === "object") {
    //   const exists = selectedColors.find((item) => item.title === color.title);
    //   if (exists) {
    //     isColorExists = true;
    //   }
    // }

    if (color && !isColorExists) {
      setSelectedColors((prevColors) => {
        return multiselect ? [...prevColors, color] : [color];
      });
      !multiselect && toggleDropdown();
    } else if (multiselect && isColorExists) {
      setSelectedColors((prevColors) =>
        prevColors.filter((item) => item !== color)
      );
      !multiselect && toggleDropdown();
      if (colors.length === selectedColors.length) {
        setIsCheckAll(false);
      }
    }
     if(!multiselect && !search){
      setIsOpen(false)
    }
    if(search && !multiselect){
      handleSubmit()
    }
  };

  // multiple select
  const handleMultipleSelect = () => {
    if (isCheckAll) {
      setSelectedColors([]);
    } else {
      setSelectedColors([...colors]);
    }
    setIsCheckAll((prev) => !prev);
  };

  // search
  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchText(value);
    if (value) {
      setIsOpen(true);
    }
  };
  // clear selection
  const clearSelection = () => {
    setSelectedColors([]);
    setIsCheckAll(false);
  };
  // display selected colors
  const displaySelectedColors = () => {
    if (selectedColors && selectedColors.length > 0) {
      if (typeof selectedColors[0] === "object") {
        return <span>{selectedColors.map((color) => color.title).join()}</span>;
      } else {
        return <span>{selectedColors.toString()}</span>;
      }
    }
  };

  // handleSubmit

  const handleSubmit = ()=>{
    
    setIsSumbitted(true);
    closeDropdown()
  }

 

  return (
    <div className="dropdown-container text-center">
      <div className="dropdown" ref={dropdownRef}>
        {search && !isSumbitted? (
          <input
            type="text"
            className="dropdown-search"
            placeholder="Search"
            onChange={handleSearch}
            onFocus={toggleDropdown}
          />
        ) : (
          <button className="dropdown-btn arrow-down" onClick={toggleDropdown}>
            <span className="dropdown-placeholder">Colors</span>

            {displaySelectedColors()}
          </button>
        )}
        {isOpen && (
          <div className="dropdown-menu">
            {colors && colors.length > 0 ? (
              <>
                {multiselect && (
                  <li className="dropdown-item " onClick={handleMultipleSelect}>
                    <Checkbox checked={isCheckAll} isdismiss={isCheckAll} />
                    {isCheckAll ? " Uncheck" : "Check"} All
                  </li>
                )}
                <div className="dropdown-menu-scroll">
                  {colors &&
                    colors.length > 0 &&
                    colors.map((color, i) => (
                      <li
                        className={`dropdown-item ${
                          selectedColors.includes(color)
                            ? "text-secondary bold"
                            : ""
                        }`}
                        key={i}
                        onClick={() => handleSelectColors(color)}
                      >
                        {multiselect && (
                          <Checkbox checked={selectedColors.includes(color)} />
                        )}
                        {typeof color === "object" ? color.title : color}
                      </li>
                    ))}
                </div>
                {search  && multiselect && (
                  <div className="dropdown-footer">
                    <button className="btn" onClick={clearSelection}>
                      Clear
                    </button>
                    <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-records">No Records Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;

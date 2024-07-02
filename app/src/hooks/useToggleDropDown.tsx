import { useState, useCallback } from "react";

const useDropdownToggle = (initialState = false) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(initialState);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prevState => !prevState);
  }, []);

  return [isDropdownOpen, toggleDropdown];
};

export default useDropdownToggle;

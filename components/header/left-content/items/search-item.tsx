import { NavbarItem } from "@heroui/navbar";
import SearchInput from "../../search-input";

const SearchItem = () => {
  return (
    <NavbarItem className="hidden lg:flex">
      <SearchInput />
    </NavbarItem>
  );
};

export default SearchItem;

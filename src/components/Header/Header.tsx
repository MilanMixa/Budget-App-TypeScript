import { FC } from "react";

const Header: FC = () => {
  let month = new Date().toLocaleString("en-US", { month: "long" });
  let year = new Date().getUTCFullYear();

  return (
    <div>
      Available budget in {month} {year}
    </div>
  );
};

export default Header;

import React from "react";
import mySvg from "./react.svg";
import { SvgIcon } from "@mui/material";

export const Logo = () => {
  return (
    <SvgIcon>
      <img src="/icon-dinosaur.svg" alt="Icon for Dynastorians" height="32px" width="32px" />
    </SvgIcon>
  );
};

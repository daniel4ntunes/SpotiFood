import React from "react";
import { Typography } from "@material-ui/core";
import { FaSpotify } from "react-icons/fa";
import { SiIfood } from "react-icons/si";

import * as S from "./styles";

const Logo = () => {
  return (
    <S.Container>
      <Typography component={S.Title1} variant="h3">
        Sp
        <FaSpotify size={32} />t
      </Typography>
      <Typography component={S.Title2} variant="h3">
        i
      </Typography>
      <Typography component={S.Title3} variant="h3">
        f<SiIfood size={40} />d
      </Typography>
    </S.Container>
  );
};

export default Logo;

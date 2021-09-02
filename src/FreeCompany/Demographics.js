import React, { useState } from "react";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

export const Demographics = ({ data, isLoading }) => {
  let [color, setColor] = useState("#353535");
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  if (isLoading) {
    return (
      <div className="sweet-loading">
        <BeatLoader
          margin={2}
          color={color}
          loading={isLoading}
          css={override}
          size={10}
        />
      </div>
    );
  } else if (data) {
    return (
      <div>
        Your Free Company demographics
        <p>Hyur: {JSON.stringify(data[0]["Hyur"]) ?? 0}</p>
        <p>Elezen: {JSON.stringify(data[0]["Elezen"]) ?? 0}</p>
        <p>Lalafell: {JSON.stringify(data[0]["Lalafell"]) ?? 0}</p>
        <p>Miqote: {JSON.stringify(data[0]["Miqote"]) ?? 0}</p>
        <p>Roegadyn: {JSON.stringify(data[0]["Roegadyn"]) ?? 0}</p>
        <p>Au Ra: {JSON.stringify(data[0]["Au Ra"]) ?? 0}</p>
        <p>Hrothgar: {JSON.stringify(data[0]["Hrothgar"]) ?? 0}</p>
        <p>Viera: {JSON.stringify(data[0]["Viera"]) ?? 0}</p>
      </div>
    );
  }
  return "";
};

import React, { useState } from "react";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

export const Demographics = ({
  totalNum,
  data,
  dataClan,
  dataGender,
  isLoading,
}) => {
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
  } else if (data && dataClan && dataGender) {
    return (
      <div>
        Your Free Company demographics
        <div className="race">
          <div>
            <p>Hyur: {JSON.stringify(data[0]["Hyur"]) ?? 0}</p>
            <p>Elezen: {JSON.stringify(data[0]["Elezen"]) ?? 0}</p>
            <p>Lalafell: {JSON.stringify(data[0]["Lalafell"]) ?? 0}</p>
            <p>Miqote: {JSON.stringify(data[0]["Miqote"]) ?? 0}</p>
            <p>Roegadyn: {JSON.stringify(data[0]["Roegadyn"]) ?? 0}</p>
            <p>Au Ra: {JSON.stringify(data[0]["Au Ra"]) ?? 0}</p>
            <p>Hrothgar: {JSON.stringify(data[0]["Hrothgar"]) ?? 0}</p>
            <p>Viera: {JSON.stringify(data[0]["Viera"]) ?? 0}</p>
          </div>
          <div>
            {Object.entries(JSON.parse(dataClan)).map(([key, value]) => {
              return (
                <h3>
                  {key} : {value.toString()}
                </h3>
              );
            })}
          </div>
        </div>
        <hr />
        <div>
          {Object.entries(JSON.parse(dataGender)).map(([key, value]) => {
            return (
              <div>
                {key} : {value.toString()}
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    );
  }
  return "";
};

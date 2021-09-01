import React from "react";

export const Demographics = ({ data, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (data) {
    return (
      <div>
        Your Free Company demographics
        <p>Hyur: {JSON.stringify(data[0]["Hyur"]) ?? 0}</p>
        <p>Elezen: {JSON.stringify(data[0]["Elezen"])?? 0}</p>
        <p>Lalafell: {JSON.stringify(data[0]["Lalafell"])?? 0}</p>
        <p>Miqote: {JSON.stringify(data[0]["Miqote"])?? 0}</p>
        <p>Roegadyn: {JSON.stringify(data[0]["Roegadyn"])?? 0}</p>
        <p>Au Ra: {JSON.stringify(data[0]["Au Ra"])?? 0}</p>
        <p>Furry Degen: {JSON.stringify(data[0]["Furry Degen"])?? 0}</p>
        <p>Furry Degen: {JSON.stringify(data[0]["Furry Degen"])?? 0}</p>
      </div>
    );
  }
  return "";
};

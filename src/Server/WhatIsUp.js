import "../App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";

function WhatIsUp() {
  const [serverList, setServerList] = useState(false);
  const [server_name, setServer] = useState("Adamantoise");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");

  const handleServerChange = (event) => {
    setServer(event);
    console.log("select " + event);
  };

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!data) {
      getServers();
      callYourAPI();
      setIsLoading(false);
    }
  }, []);

  const getServers = async () => {
    setIsLoading(true);
    const url_base = "https://xivapi.com";
    await axios.get(url_base + "/servers").then((res) => {
      // Handle Your response here.
      setServerList(res.data);
      console.log(res.data);
    });
  };

  const callYourAPI = async () => {
    setIsLoading(true);
    const url_base = "https://universalis.app/";
    const payload = {
      world: server_name,
    };
    await axios
      .get(
        url_base + "api/extra/stats/most-recently-updated?world=" + server_name
      )
      .then((res) => {
        // Handle Your response here.
        console.log(res);
      });
  };
  if (serverList && !isLoading) {
    return (
      <div class="main">
        <select onChange={(e) => handleServerChange(e.target.value)}>
          {serverList.map((item) => (
            <option key={item.value} value={item.value}>
              {item}
            </option>
          ))}
        </select>
        <div>Current server: {server_name ?? "None"}</div>
      </div>
    );
  }
  return (
    <div className="sweet-loading">
      <BeatLoader
        margin={2}
        color={"#353535"}
        loading={true}
        css={`
          display: block;
          margin: 0 auto;
          border-color: red;
        `}
        size={10}
      />
    </div>
  );
}

export default WhatIsUp;

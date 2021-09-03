import "../App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";

function WhatIsUp() {
  const [serverList, setServerList] = useState(false);
  const [server_name, setServer] = useState("Adamantoise");
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsInfo, setItemsInfo] = useState("");
  const [data, setData] = useState("");

  const handleServerChange = (event) => {
    setServer(event);
    console.log("select " + event);
  };

  const handleInput = () => {
    getItemHistory();
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
    });
  };

  const callYourAPI = async () => {
    setIsLoading(true);
    const url_base = "https://universalis.app/";
    await axios
      .get(
        url_base + "api/extra/stats/most-recently-updated?world=" + server_name
      )
      .then((res) => {
        // Handle Your response here.
        var itemIds = [];
        for (let i = 0; i < res.data.items.length; i++) {
          itemIds.push(res.data.items[i]["itemID"]);

          if (i === 1) {
            break;
          }
        }
        setItems(itemIds);
      });
  };

  const getItemHistory = async () => {
    setIsLoading(true);
    const url_base = "https://universalis.app/";

    var info = {};
    var infoArr = [];

    for (let i = 0; i < items.length; i++) {
      await axios
        .get(url_base + "api/v2/history/" + server_name + "/" + items[i])
        .then(async (res) => {
          // Handle Your response here.
          var itemName = await getItemInfo(res.data.itemID);
          console.log(itemName);
          info[itemName] = res.data;
          infoArr.push(info);
        });
    }
    setIsLoading(false);
  };

  async function getItemInfo(itemId) {
    const url_base = "https://xivapi.com/";

    const name = await axios
      .get(url_base + "item/" + itemId)
      .then(async (res) => {
        return res.data["Name"];
      });
    return name;
  }

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
        <button class="button" type="button" onClick={() => handleInput()}>
          Generate
        </button>
        {data ? <div>{data}</div> : ""}
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

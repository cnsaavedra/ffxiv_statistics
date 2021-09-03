import "../App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Demographics } from "./Demographics";
import BeatLoader from "react-spinners/BeatLoader";

function FCStatistics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serverList, setServerList] = useState(false);
  const [server_name, setServer] = useState("Adamantoise");
  const [data, setData] = useState("");
  const [dataClan, setDataClan] = useState("");
  const [dataGender, setDataGender] = useState("");
  const [totalNum, setTotalNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleInput = () => {
    callYourAPI();
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
    const url_base = "https://xivapi.com";
    const payload = {
      name: searchTerm,
      server: server_name,
    };
    await axios.post(url_base + "/freecompany/search", payload).then((res) => {
      // Handle Your response here.
      const fc_id = res.data["Results"][0]["ID"];
      getByFCID(fc_id);
      console.log("got FC id");
      setLoadingStatus("Receieved FC ID...");
    });
  };

  const getByFCID = async (fc_id) => {
    const url_base = "https://xivapi.com";
    const payload = {
      data: "FCM",
    };
    await axios
      .post(url_base + "/freecompany/" + fc_id, payload)
      .then((res) => {
        // Handle Your response here.
        const members_data = res.data["FreeCompanyMembers"];
        setTotalNum(members_data.length);
        var ID_arr = [];
        for (let i = 0; i < members_data.length; i++) {
          ID_arr[i] = members_data[i]["ID"];
          setLoadingStatus("Loading FC members...");
          // if (i === 5) {
          //   break;
          // }
        }
        getRaceByID(ID_arr);
        console.log("got members ID");
      });
  };

  const getRaceByID = async (ID_arr) => {
    const url_base = "https://xivapi.com";
    const payload = {
      columns: "Character.Race,Character.Tribe,Character.Gender",
    };

    const census_list = [];
    const races = [
      "Unknown",
      "Hyur",
      "Elezen",
      "Lalafell",
      "Miqote",
      "Roegadyn",
      "Au Ra",
      "Hrothgar",
      "Viera",
    ];
    const tribes = [
      "Unknown",
      "Midlander",
      "Highlander",
      "Wildwood",
      "Duskwight",
      "Plainsfolk",
      "Dunesfolk",
      "Seeker",
      "Keeper",
      "Sea Wolf",
      "Hellsguard",
      "Raen",
      "Xaela",
      "Hrothgar",
      "Hrothgar",
      "Viera",
      "Viera",
    ];
    const genders = ["Unknown", "M", "F"];

    for (let i = 0; i < ID_arr.length; i++) {
      await axios
        .post(url_base + "/character/" + ID_arr[i], payload)
        .then((res) => {
          var datum = [
            races[res.data["Character"]["Race"] || 0],
            tribes[res.data["Character"]["Tribe"] || 0],
            genders[res.data["Character"]["Gender"] || 0],
          ];
          census_list.push(datum);
        });
    }
    var demographics = {};
    var demographicsClan = {};
    var demographicsGender = {};
    
    for (let i = 0; i < census_list.length; i++) {
      demographics[census_list[i][0]] =
        (demographics[census_list[i][0]] ?? 0) + 1;

      demographicsClan[census_list[i][1]] =
        (demographicsClan[census_list[i][1]] ?? 0) + 1;

      demographicsGender[census_list[i][2]] =
        (demographicsGender[census_list[i][2]] ?? 0) + 1;

      setLoadingStatus("Iterating... ");
    }
    setIsLoading(false);
    setData([demographics]);
    setDataClan(JSON.stringify(demographicsClan));
    setDataGender(JSON.stringify(demographicsGender));
    setLoadingStatus("");
  };

  if (serverList) {
    return (
      <div class="search-wrap">
        <h1>Please search your exact FC name to find your FC demographics!</h1>
        <select onChange={(e) => handleServerChange(e.target.value)}>
          {serverList.map((item) => (
            <option key={item.value} value={item.value}>
              {item}
            </option>
          ))}
        </select>
        <div>Current server: {server_name ?? "None"}</div>
        <form class="search">
          <label>
            Free Company name:
            <input
              type="text"
              placeholder="Please type here..."
              value={searchTerm}
              onChange={handleChange}
            />
          </label>
          <button class="button" type="button" onClick={() => handleInput()}>
            Generate
          </button>
        </form>
        <Demographics
          totalNum={totalNum}
          data={data}
          dataClan={dataClan}
          dataGender={dataGender}
          isLoading={isLoading}
        />
        {loadingStatus ? <div>{loadingStatus}</div> : ""}
      </div>
    );
  } else {
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
}

export default FCStatistics;

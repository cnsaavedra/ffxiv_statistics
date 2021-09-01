import "../App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Demographics } from "./Demographics";

function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = () => {
    callYourAPI();
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!data) {
      callYourAPI();
      setIsLoading(false);
    }
  }, []);

  const callYourAPI = async () => {
    setIsLoading(true);
    const url_base = "https://xivapi.com";
    const server_name = "Adamantoise";
    const payload = {
      name: searchTerm,
      server: server_name,
    };
    await axios.post(url_base + "/freecompany/search", payload).then((res) => {
      // Handle Your response here.
      const fc_id = res.data["Results"][0]["ID"];
      getByFCID(fc_id);
      console.log("got FC id");
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
        var ID_arr = [];
        for (let i = 0; i < members_data.length; i++) {
          ID_arr[i] = members_data[i]["ID"];
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
      "Furry Degen Female",
      "Furry Degen Female"
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
      "Furry Degen",
      "Furry Degen",
      "Furry Degen Female",
      "Furry Degen Female",
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
    for (let i = 0; i < census_list.length; i++) {
      demographics[census_list[i][0]] = (demographics[census_list[i][0]] ?? 0) + 1;
    }
    setIsLoading(false);
		console.log(demographics);
    setData([demographics]);
  };

  return (
    <div className="App">
      <p>Please search your FC name to find your FC demographics!</p>
      <form class="search">
        <label>
          Free Company name:
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={() => handleInput()}>
          Show me!
        </button>
      </form>
      <Demographics data={data} isLoading={isLoading} />
    </div>
  );
}

export default MainPage;

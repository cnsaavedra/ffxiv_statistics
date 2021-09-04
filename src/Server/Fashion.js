import "../App.css";
import React, { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

export const Fashion = () => {
  const [data, setData] = useState("");
  const [fashionData, setFashionData] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [pages] = useState(
    Math.round(data.length / data ?? data.Pagination.ResultsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const getPaginationGroup = () => {
    let start =
      Math.floor((currentPage - 1) / data.Pagination.PageTotal) *
      data.Pagination.PageTotal;
    return new Array(data.Pagination.PageTotal)
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  function goToPreviousPage() {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  function goToNextPage() {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  const getPaginatedData = () => {
    return JSON.stringify(data.Results);
  };

  async function getItemInfo(itemId) {
    const url_base = "		https://ffxivcollect.com/api/fashions?item_id=";
    await axios.get(url_base + itemId).then((res) => {
      console.log(res);
    });
  }

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
    const getClothes = async () => {
      setIsLoading(true);
      const url_base = "https://xivapi.com";
      await axios
        .get(
          url_base +
            "/search?filters=LevelItem<=1,LevelItem<=1,ClassJobCategory.ID=1&page=" +
            currentPage
        )
        .then((res) => {
          setData(res.data);
        });
    };
    getClothes();
  }, [currentPage]);

  if (data) {
    return (
      <div class="fashion-main">
        <div className="dataContainer">
          <div className="group">
            {JSON.parse(getPaginatedData()).map((d, idx) => (
              <div className="item">
                <p>{d.Name}</p>
                <img
                  src={"https://xivapi.com" + d.Icon}
                  alt={d.Name + "Image"}
                ></img>
              </div>
            ))}
          </div>
        </div>

        <div className="pagination">
          {/* previous button */}
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          >
            prev
          </button>

          {/* show page numbers */}
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? "active" : null
              }`}
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            onClick={goToNextPage}
            className={`next ${
              Number(currentPage) === 14 ? "disabled" : ""
            }`}
          >
            next
          </button>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Fashion;

import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

import Header from "../Header";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function Home() {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [spotlightArray, setSpotlightArray] = useState([]);
  const [spotlight, setSpotlight] = useState(null);
  const { user, setUser } = useContext(UserContext);

  let history = useHistory();

  useEffect(() => {
    getGames();
  }, []);

  function getGames() {
    const allGames = axios.get("http://localhost:4000/games");

    allGames.then((response) => {
      setGames([...response.data]);
      setLoading(false);
    });
    allGames.catch((err) => {
      console.log(err.response);
      alert("Error when fetching data. Please reload page.");
    });

    const spotGames = axios.get("http://localhost:4000/spotlight");

    spotGames.then((response) => {
      setSpotlightArray([...response.data]);
      setSpotlight(response.data[0]);
    });
    spotGames.catch((err) => console.log(err.response));
  }

  return (
    <>
      <Header />
      <App>
        <Spotlight spotlightArray={spotlightArray} spotlight={spotlight}>
          <div className="main-spotlight"></div>
          <div className="spotlight-options">
            {spotlightArray.length !== 0
              ? spotlightArray.map((s, i) => {
                  return (
                    <div
                      onClick={() => setSpotlight(spotlightArray[i])}
                      className="option"
                      key={i}
                    >
                      <img
                        src={spotlightArray[i].spotlight}
                        alt="Game picture"
                      />
                      <p>{spotlightArray[i].title}</p>
                    </div>
                  );
                })
              : ""}
          </div>
        </Spotlight>

        <Discount>
          <p className="discount-title">ON SALE</p>
          <Swiper
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 10,
                slidesPerGroup: 1,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: 2,
              },
              700: {
                slidesPerView: 3,
                spaceBetween: 20,
                slidesPerGroup: 3,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1800: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
            loop={false}
            loopFillGroupWithBlank={false}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="mySwiper"
          >
            {loading
              ? ""
              : games.map((g, i) => {
                  if (g.discount === 0) {
                    return;
                  }
                  return (
                    <SwiperSlide key={i}>
                      <img src={g.poster} alt={`${g.title} poster`} />
                      <p className="game-title">{g.title}</p>
                      <div className="game-price">
                        {g.discount > 0 ? (
                          <div className="discount">
                            <p>-{g.discount}%</p>
                          </div>
                        ) : (
                          ""
                        )}
                        <span className="original-price">
                          {(g.price / 100).toFixed(2)}
                        </span>
                        {g.discount > 0 ? (
                          <span className="current-price">
                            {((g.price / 100) * (1 - g.discount / 100)).toFixed(
                              2
                            )}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </Discount>

        <TopSellers>
          <p className="topsell-title">Most Popular</p>
          <Swiper
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 10,
                slidesPerGroup: 1,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: 2,
              },
              700: {
                slidesPerView: 3,
                spaceBetween: 20,
                slidesPerGroup: 3,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1800: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
            loop={false}
            loopFillGroupWithBlank={false}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="mySwiper"
          >
            {loading
              ? ""
              : games.map((g, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img src={g.poster} alt={`${g.title} poster`} />
                      <p className="game-title">{g.title}</p>
                      <div className="game-price">
                        {g.discount > 0 ? (
                          <div className="discount">
                            <p>-{g.discount}%</p>
                          </div>
                        ) : (
                          ""
                        )}
                        <span
                          className={
                            g.discount > 0 ? "original-price" : "price"
                          }
                        >
                          {(g.price / 100).toFixed(2)}
                        </span>
                        {g.discount > 0 ? (
                          <span className="current-price">
                            {((g.price / 100) * (1 - g.discount / 100)).toFixed(
                              2
                            )}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </TopSellers>
      </App>
    </>
  );
}

const App = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .swiper-container {
    width: 100%;
    max-height: 575px;
  }

  .swiper-slide {
    font-size: 18px;
    border-radius: 4px;
    max-height: 525px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
  }

  .swiper-slide img {
    display: block;
    height: calc((16 / 9) * ((80vw - 60px) / 4));
    max-height: 380px;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  .game-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #ffffff;
    font-size: 14px;
    margin-top: 15px;
  }
  .game-price {
    display: flex;
    align-items: center;
    margin-top: 15px;
    font-size: 12px;
    color: #ffffff;
  }
  .discount {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 45px;
    border-radius: 4px;
    margin-right: 10px;
    background-color: #0f4c75;
  }
  .original-price {
    margin-right: 10px;
    text-decoration: line-through;
  }
  .price {
    text-decoration: none;
  }

  @media (max-width: 1400px) {
    .swiper-slide img {
      max-height: 350px;
    }
  }

  @media (max-width: 699px) {
    .swiper-slide {
      height: calc((16 / 9) * ((90vw - 20px) / 2) + 15px);
      max-height: 450px;
    }
    .swiper-slide img {
      height: calc((16 / 9) * ((90vw - 20px) / 2));
    }
  }

  @media (max-width: 399px) {
    .swiper-container {
      width: 100%;
      max-height: calc((16 / 9) * 90vw + 20px);
    }
    .swiper-slide {
      height: calc((16 / 9) * 90vw);
      max-height: calc((16 / 9) * 90vw);
    }
    .swiper-slide img {
      height: calc((16 / 9) * 90vw);
      max-height: calc((16 / 9) * 90vw);
    }
  }
`;

const Spotlight = styled.div`
  margin: 100px auto 0px;
  width: 75vw;
  max-width: 1600px;
  max-height: 900px;
  display: flex;

  .main-spotlight {
    width: calc(100% - 200px);
    height: calc((9 / 16) * (0.7 * 80vw));
    background-image: url("${(props) => props.spotlight?.spotlight}");
    background-size: cover;
    background-position: center;
  }
  .spotlight-options {
    width: 200px;
  }
  .option {
    width: 100%;
    height: calc(((9 / 16) * (0.7 * 80vw)) / 3);
    background-color: #32444d;
    padding: 0px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;

    img {
      height: 90px;
      width: 160px;
    }
    p {
      color: #ffffff;
      font-size: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 180px;
    }
  }
  .option:hover {
    filter: brightness(1.2);
  }

  @media (max-width: 1600px) {
    .option {
      img {
        height: 79px;
        width: 140px;
      }
    }
  }

  @media (max-width: 1300px) {
    .option {
      img {
        height: 68px;
        width: 120px;
      }
    }
  }

  @media (max-width: 1000px) {
    .main-spotlight {
      width: calc(100% - 150px);
    }
    .spotlight-options {
      width: 150px;
    }
    .option {
      img {
        height: 45px;
        width: 80px;
      }
      p {
        font-size: 14px;
        max-width: 150px;
      }
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
    width: 90vw;

    .main-spotlight {
      width: 100%;
      height: calc((9 / 16) * 90vw);
    }
    .spotlight-options {
      display: flex;
      justify-content: space-between;
      width: 90vw;
    }
    .option {
      justify-content: center;
      align-items: center;
      padding: 0px 5px;
      height: 80px;
      width: calc(90vw / 3);

      p {
        text-align: center;
        margin: 5px 0px 0px;
        width: calc(90vw / 3);
      }
      img {
      }
    }
  }
`;

const Discount = styled.div`
  width: 75vw;
  margin: 25px auto 0px;

  .discount-title {
    margin-bottom: 20px;
    font-size: 36px;
    color: #ffffff;
  }
  @media (max-width: 600px) {
    width: 90vw;

    .discount-title {
      font-size: 28px;
    }
  }
`;

const TopSellers = styled.div`
  width: 75vw;
  margin: 20px auto;

  .topsell-title {
    margin-bottom: 20px;
    font-size: 36px;
    color: #ffffff;
  }
  @media (max-width: 600px) {
    width: 90vw;

    .topsell-title {
      font-size: 28px;
    }
  }
`;

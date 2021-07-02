import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

import { FaCartPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function Home({ cartList, setCartList }) {
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

  function addToCart(e, game) {
    e.stopPropagation();

    if (cartList.includes(game)) {
      return;
    }

    setCartList([...cartList, game]);
  }

  return (
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
                    <img src={spotlightArray[i].spotlight} alt="Game picture" />
                    <p>{spotlightArray[i].title}</p>
                  </div>
                );
              })
            : ""}
        </div>
        <AddToCart onClick={(e) => addToCart(e, spotlight)}>
          {spotlight?.discount > 0 ? (
            <>
              <span className="original-price">
                {(spotlight?.price / 100).toFixed(2)}
              </span>
              <span className="price">
                {(
                  (spotlight?.price / 100) *
                  (1 - spotlight?.discount / 100)
                ).toFixed(2)}
              </span>
            </>
          ) : (
            <p className="price">{(spotlight?.price / 100).toFixed(2)}</p>
          )}
          <p className=""></p>
          <button className="add-button">
            {spotlight?.discount > 0 ? "Save Now" : "Buy Now"}
          </button>
        </AddToCart>
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
                    <div className="relative">
                      <img src={g.poster} alt={`${g.title} poster`} />
                      <QuickAdd
                        onClick={(e) => AddToCart(e, g)}
                        className="hover"
                      >
                        <FaCartPlus />
                      </QuickAdd>
                    </div>
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
                    <div className="relative">
                      <img src={g.poster} alt={`${g.title} poster`} />
                      <QuickAdd
                        onClick={(e) => AddToCart(e, g)}
                        className="hover"
                      >
                        <FaCartPlus />
                      </QuickAdd>
                    </div>
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
                        className={g.discount > 0 ? "original-price" : "price"}
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
  .relative {
    position: relative;
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
    color: #cccccc;
  }
  .price {
    text-decoration: none;
  }
  .swiper-slide:hover {
    .hover {
      display: flex;
      justify-content: center;
      align-items: center;
    }
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

  @media (max-width: 599px) {
    .swiper-slide {
      height: calc((16 / 9) * ((90vw - 20px) / 2));
      max-height: 475px;
    }
    .swiper-slide img {
      height: calc((16 / 9) * ((90vw - 20px) / 2) - 75px);
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
      max-height: calc((16 / 9) * 90vw - 75px);
    }
  }
`;

const Spotlight = styled.div`
  margin: 100px auto 0px;
  width: 75vw;
  max-width: 1600px;
  max-height: 900px;
  display: flex;
  position: relative;

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
    }
  }
`;

const AddToCart = styled.div`
  height: 80px;
  width: 180px;
  padding-top: 10px;
  text-align: center;
  border-radius: 3px;
  background-color: rgba(128, 128, 128, 0.8);
  position: absolute;
  bottom: 25px;
  left: 25px;
  color: #ffffff;

  .add-button {
    background-color: #3282b8;
    color: #ffffff;
    font-size: 14px;
    width: 140px;
    height: 40px;
    border-radius: 4px;
    border: none;
    margin-top: 5px;
  }

  @media (max-width: 699px) {
    padding-top: 5px;
    height: 60px;
    width: 150px;

    .add-button {
      width: 100px;
      height: 30px;
    }
  }
  @media (max-width: 599px) {
    bottom: 100px;
    left: 20px;
  }
`;

const QuickAdd = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  background-color: rgba(27, 38, 44, 0.9);
  color: #bbe1fa;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  bottom: 20px;
  right: 20px;
  font-size: 24px;

  @media (max-width: 399px) {
    height: 60px;
    width: 60px;
    bottom: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
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

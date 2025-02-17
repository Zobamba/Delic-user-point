import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../../api/axios';
import { ReactComponent as Slider } from '../../assets/slider.svg';
import Modal from './Modal'
import './MenuCart.scss';

const MenuCart = ({ menuCartRef }) => {
  const [currentTab, setCurrentTab] = useState('starters');
  const [starters, setStarters] = useState();
  const [mainDishes, setMainDishes] = useState();
  const [desserts, setDesserts] = useState();
  const [drinks, setDrinks] = useState();
  const [swallows, setSwallows] = useState();
  const [modalOpen, setModalOpen] = useState();

  useEffect(() => {
    const getStarters = async () => {
      try {
        const response = await axios.get('/menusMeals?category=starters');
        setStarters(response.data.mealRecords);
      } catch (err) {
        console.error(err);
      }
    };

    const getMainDishes = async () => {
      try {
        const response = await axios.get('/menusMeals?category=main dishes');
        setMainDishes(response.data.mealRecords);
      } catch (err) {
        console.error(err);
      }
    };

    const getDesserts = async () => {
      try {
        const response = await axios.get('/menusMeals?category=desserts');
        setDesserts(response.data.mealRecords);
      } catch (err) {
        console.error(err);
      }
    };

    const getDrinks = async () => {
      try {
        const response = await axios.get('/menusMeals?category=drinks');
        setDrinks(response.data.mealRecords);
      } catch (err) {
        console.error(err);
      }
    };

    const getSwallows = async () => {
      try {
        const response = await axios.get('/menusMeals?category=swallows');
        setSwallows(response.data.mealRecords);
      } catch (err) {
        console.error(err);
      }
    };

    getStarters();
    getMainDishes();
    getDesserts();
    getDrinks();
    getSwallows();
  }, []);

  const handleOpenModal = () => {
    document.body.classList.add('modal-open');
  };

  return (
    <section className="menu-cart scroll-reveal" ref={menuCartRef}>
      <div className="container">
        <h1 className="header-txt">Menu Cart</h1>
        <div className="divider">
          <Slider />
        </div>
        <ul className="menu-navigation">
          <li className="tabs-title">
            <a
              className="m-anim"
              aria-selected={currentTab === 'starters'}
              data-text="Starters"
              onClick={() => setCurrentTab('starters')}
            >
              Starters
            </a>
          </li>
          <li className="tabs-title">
            <a
              className="m-anim"
              aria-selected={currentTab === 'main-dishes'}
              data-text="Main Dishes"
              onClick={() => setCurrentTab('main-dishes')}
            >
              Main
              Dishes
            </a>
          </li>
          <li className="tabs-title">
            <a
              className="m-anim"
              data-text="Swallows"
              aria-selected={currentTab === 'swallows'}
              onClick={() => setCurrentTab('swallows')}
            >
              Swallows
            </a>
          </li>
          <li className="tabs-title">
            <a
              className="m-anim"
              aria-selected={currentTab === 'desserts'}
              data-text="Desserts"
              onClick={() => setCurrentTab('desserts')}
            >
              Desserts
            </a>
          </li>
          <li className="tabs-title">
            <a
              className="m-anim"
              data-text="Drinks"
              aria-selected={currentTab === 'drinks'}
              onClick={() => setCurrentTab('drinks')}
            >
              Drinks
            </a>
          </li>
        </ul>

        <div className="tabs-content" data-tabs-content="example-tabs">
          {modalOpen &&
            <Modal
              setModalOpen={setModalOpen}
              selectedMeal={modalOpen}
            />}

          {starters &&
            <div className={`tabs-panel ${currentTab === 'starters' ? 'is-active' : ''}`}>
              {starters.map((starter, i) => {
                return (
                  <div className="menu-content" key={i}>
                    <div className="image">
                      <img
                        title={starter.name}
                        src={starter.imageUrl}
                        alt={starter.name}
                        onClick={() => {
                          setModalOpen(starter); handleOpenModal();
                        }} />
                    </div>
                    <div className="menu-section">
                      <table>
                        <tbody>
                          <tr>
                            <td><span>{starter.name}</span></td>
                            <td>
                              <span>
                                &#8358;{(starter.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>{starter.description}
                              <br />
                              <button
                                onClick={() => {
                                  setModalOpen(starter); handleOpenModal();
                                }}
                              >
                                details
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          }

          {mainDishes &&
            <div className={`tabs-panel ${currentTab === 'main-dishes' ? 'is-active' : ''}`}>
              {mainDishes.map((mainDish, i) => {
                return (
                  <div className="menu-content" key={i}>
                    <div className="image">
                      <img
                        title={mainDish.name}
                        src={mainDish.imageUrl}
                        alt={mainDish.name}
                        onClick={() => {
                          setModalOpen(mainDish); handleOpenModal();
                        }} />
                    </div>
                    <div className="menu-section">
                      <table>
                        <tbody>
                          <tr>
                            <td><span>{mainDish.name}</span></td>
                            <td>
                              <span>
                                &#8358;{(mainDish.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>{mainDish.description}
                              <br />
                              <button
                                onClick={() => {
                                  setModalOpen(mainDish); handleOpenModal();
                                }}
                              >
                                Open
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          }

          {swallows &&
            <div className={`tabs-panel ${currentTab === 'swallows' ? 'is-active' : ''}`}>
              {swallows.map((swallow, i) => {
                return (
                  <div className="menu-content" key={i}>
                    <div className="image">
                      <img
                        title={swallow.name}
                        src={swallow.imageUrl}
                        alt={swallow.name}
                        onClick={() => {
                          setModalOpen(swallow); handleOpenModal();
                        }} />
                    </div>
                    <div className="menu-section">
                      <table>
                        <tbody>
                          <tr>
                            <td><span>{swallow.name}</span></td>
                            <td>
                              <span>
                                &#8358;{(swallow.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>{swallow.description}
                              <br />
                              <button
                                onClick={() => {
                                  setModalOpen(swallow); handleOpenModal();
                                }}
                              >
                                Open
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          }

          {desserts &&
            <div className={`tabs-panel ${currentTab === 'desserts' ? 'is-active' : ''}`}>
              {desserts.map((dessert, i) => {
                return (
                  <div className="menu-content" key={i}>
                    <div className="image">
                      <img
                        title={dessert.name}
                        src={dessert.imageUrl}
                        alt={dessert.name}
                        onClick={() => {
                          setModalOpen(dessert); handleOpenModal();
                        }} />
                    </div>
                    <div className="menu-section">
                      <table>
                        <tbody>
                          <tr>
                            <td><span>{dessert.name}</span></td>
                            <td>
                              <span>
                                &#8358;{(dessert.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>{dessert.description}
                              <br />
                              <button
                                onClick={() => {
                                  setModalOpen(dessert); handleOpenModal();
                                }}
                              >
                                Open
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          }

          {drinks &&
            <div className={`tabs-panel ${currentTab === 'drinks' ? 'is-active' : ''}`}>
              {drinks.map((drink, i) => {
                return (
                  <div className="menu-content" key={i}>
                    <div className="image">
                      <img
                        title={drink.name}
                        src={drink.imageUrl}
                        alt={drink.name}
                        onClick={() => {
                          setModalOpen(drink); handleOpenModal();
                        }} />
                    </div>
                    <div className="menu-section">
                      <table>
                        <tbody>
                          <tr>
                            <td><span>{drink.name}</span></td>
                            <td>
                              <span>
                                &#8358;{(drink.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>{drink.description}
                              <br />
                              <button
                                onClick={() => {
                                  setModalOpen(drink); handleOpenModal();
                                }}
                              >
                                Open
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          }
        </div>
      </div>
    </section>
  );
};

MenuCart.propTypes = {
  menuCartRef: PropTypes.object.isRequired,
};

export default MenuCart;

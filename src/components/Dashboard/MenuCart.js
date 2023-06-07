/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Slider } from '../../assets/slider.svg';
import './MenuCart.scss';

const MenuCart = ({ menuCartRef }) => {
  const [currentTab, setCurrentTab] = useState('starters');

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
          <div className={`tabs-panel ${currentTab === 'starters' ? 'is-active' : ''}`}>
            <div className="menu-content">
              <div className="menu-section">
                <table>
                  <tr>
                    <td><span>SMOKED RICOTTA TERRINE</span></td>
                    <td><span>$12</span></td>
                  </tr>
                  <tr>
                    <td>ricotta, shallots, cheddar, capers</td>
                  </tr>
                  <tr>
                    <td><span>SAMPHIRE FRITTERS WITH FENNEL CEVICHE </span></td>
                    <td><span>$19</span></td>
                  </tr>
                  <tr>
                    <td>fresh samphire, plain flour, cornflower, eggs, fennel</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$13</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>SMOKED RICOTTA TERRINE</span></td>
                    <td><span>$12</span></td>
                  </tr>
                  <tr>
                    <td>ricotta, shallots, cheddar, capers</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$11</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$16</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                </table>
              </div>
              <div className="menu-section">
                <table>
                  <tr>
                    <td><span>SMOKED RICOTTA TERRINE</span></td>
                    <td><span>$12</span></td>
                  </tr>
                  <tr>
                    <td>ricotta, shallots, cheddar, capers</td>
                  </tr>
                  <tr>
                    <td><span>SAMPHIRE FRITTERS WITH FENNEL CEVICHE </span></td>
                    <td><span>$19</span></td>
                  </tr>
                  <tr>
                    <td>fresh samphire, plain flour, cornflower, eggs, fennel</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$13</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>SMOKED RICOTTA TERRINE</span></td>
                    <td><span>$12</span></td>
                  </tr>
                  <tr>
                    <td>ricotta, shallots, cheddar, capers</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$11</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$16</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div className={`tabs-panel ${currentTab === 'main-dishes' ? 'is-active' : ''}`}>
            <div className="menu-content">
              <div className="menu-section">
                <table>
                  <tr>
                    <td><span>SAMPHIRE FRITTERS WITH FENNEL CEVICHE </span></td>
                    <td><span>$19</span></td>
                  </tr>
                  <tr>
                    <td>fresh samphire, plain flour, cornflower, eggs, fennel</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$13</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>SMOKED RICOTTA TERRINE</span></td>
                    <td><span>$12</span></td>
                  </tr>
                  <tr>
                    <td>ricotta, shallots, cheddar, capers</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$11</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$16</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                </table>
              </div>
              <div className="menu-section">
                <table>
                  <tr>
                    <td><span>SAMPHIRE FRITTERS WITH FENNEL CEVICHE </span></td>
                    <td><span>$19</span></td>
                  </tr>
                  <tr>
                    <td>fresh samphire, plain flour, cornflower, eggs, fennel</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$13</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>SMOKED RICOTTA TERRINE</span></td>
                    <td><span>$12</span></td>
                  </tr>
                  <tr>
                    <td>ricotta, shallots, cheddar, capers</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$11</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$16</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div className={`tabs-panel ${currentTab === 'desserts' ? 'is-active' : ''}`}>
            <div className="menu-content">
              <div className="menu-section">
                <table>

                  <tr>
                    <td><span>SMOKED RICOTTA TERRINE</span></td>
                    <td><span>$12</span></td>
                  </tr>
                  <tr>
                    <td>ricotta, shallots, cheddar, capers</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$11</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>COURGETTE FLOWERS</span></td>
                    <td><span>$16</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                </table>
              </div>
              <div className="menu-section">
                <table>
                  <tr>
                    <td><span>SMOKED RICOTTA TERRINE</span></td>
                    <td><span>$12</span></td>
                  </tr>
                  <tr>
                    <td>ricotta, shallots, cheddar, capers</td>
                  </tr>
                  <tr>
                    <td><span>PAN FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$11</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>FRIED COURGETTE FLOWERS</span></td>
                    <td><span>$16</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div className={`tabs-panel ${currentTab === 'drinks' ? 'is-active' : ''}`}>
            <div className="menu-content">
              <div className="menu-section">
                <table>
                  <tr>
                    <td><span>COURGETTE FLOWERS</span></td>
                    <td><span>$11</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>SMOKED RICOTTA TERRINE</span></td>
                    <td><span>$12</span></td>
                  </tr>
                  <tr>
                    <td>ricotta, shallots, cheddar, capers</td>
                  </tr>
                </table>
              </div>
              <div className="menu-section">
                <table>
                  <tr>
                    <td><span>COURGETTE FLOWERS</span></td>
                    <td><span>$11</span></td>
                  </tr>
                  <tr>
                    <td>courgette flowers, goats cheese, red onion, pine nuts</td>
                  </tr>
                  <tr>
                    <td><span>SMOKED RICOTTA TERRINE</span></td>
                    <td><span>$12</span></td>
                  </tr>
                  <tr>
                    <td>ricotta, shallots, cheddar, capers</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

MenuCart.propTypes = {
  menuCartRef: PropTypes.object.isRequired,
};

export default MenuCart;

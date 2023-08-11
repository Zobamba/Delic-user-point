import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import './Account.scss';

const Account = () => {
  const name = localStorage.getItem("firstName");

  const logout = () => {
    let keysToRemove = ["token", "firstName"];

    keysToRemove.forEach((k) => {
      localStorage.removeItem(k)
    });

    window.location.href = '/';
  }

  return (
    <section className="acc-s">
      <div className="acc">
        {!name ?
          <div className="sgn">
            <Link to="/sign-in" className="btn">
              Sign in
            </Link>
          </div>
          :
          ''
        }
        <div className="cnt">
          <article className="card">
            <ul className="list">
              <li><Link to="/profile">
                <FontAwesomeIcon className="icon" icon={faUserCircle} />My Account</Link>
              </li>
              <li><Link to="/orders">
                <FontAwesomeIcon className="icon" icon={faShoppingBasket} />Orders</Link>
              </li>
              <li><Link to="/savedItems">
                <FontAwesomeIcon className="icon" icon={faHeart} /> Saved Items</Link>
              </li>
            </ul>
            {name &&
              <div className="sgn">
                <button
                  className="btn"
                  onClick={logout}>
                  LogOut
                </button>
              </div>}
          </article>
        </div>
      </div>
    </section>
  )
}

export default Account

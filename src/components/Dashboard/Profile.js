import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from '../../api/axios';
import Logo from '../../assets/img/delic-logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faUserSlash, } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import './Profile.scss';

const Profile = () => {
  const [user, setUser] = useState();
  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const [imageVisible, setImageVisible] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

  let hash = localStorage.getItem('hash');

  // const closeNotification = () => {
  //   setNotification(null);
  // };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true
        });

        setUser(response.data.user);
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        setPhotoUrl(response.data.user.photoUrl);
      } catch (err) {
        console.log(err);
        navigate('/sign-in', { state: { from: location }, replace: true });
      }
    }

    getUser();
    setImageVisible(true);
  }, [navigate, location]);

  return (
    <div>
      <div className="page-wrapper">
        <div className="container">
          <div className="logo">
            <img src={Logo} alt="" height={70} width={70} />
          </div>
          <div className="row">
            <div className="card-header">
              <div className="header-content">
                <h6 className="mb-0 text-sm">{(firstName + ' ' + lastName)}</h6>
              </div>
            </div>
            <ol className="breadcrumb">
              <li><Link to={"/"}>Home</Link></li>
              <li>Profile</li>
            </ol>
            <div className="form-data">
              {photoUrl &&
                <div className={`img profile-pic ${imageVisible ? 'act' : ''}`}>
                  <img src={photoUrl} alt="" />
                </div>}
              {user &&
                <div className="form-center m-auto pt-pr">
                  <div className="frm-header">
                    <h6 className="mb-0 text-sm">
                      Account Overview
                    </h6>
                    <span>
                      <Link
                        to={'/updateProfile'}>
                        <FontAwesomeIcon title="Edit profile" className="icon-edit" icon={faEdit} />
                      </Link>
                    </span>
                  </div>
                  <div className="info">
                    <div className="d-flex">
                      <p className="sub-info">
                        <span className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                          <i className="ni text-sm">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </i>
                        </span>
                        {user.email}
                      </p>
                      <p className="sub-info">
                        <span className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                          <i className="ni text-sm">
                            <FontAwesomeIcon icon={faPhone} />
                          </i>
                        </span>
                        {user.phoneNumber}
                      </p>
                    </div>

                    <div className="d-flex">
                      <p className="sub-info switch">
                        <span className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                          <i className="ni text-sm">
                            <FontAwesomeIcon icon={faLocationDot} />
                          </i>
                        </span>
                        {/* <span className="label">Address:</span> */}
                        Anglican junction, through Redeem junction Okpanam road, Asaba Delta state
                      </p>
                    </div>

                    <div className="d-flex">
                      <p className="sub-info">
                        <span className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                          <i className="ni text-sm">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </i>
                        </span>
                        <span className="label">Last updated</span>
                        {new Date(user.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="sub-info">
                        <span className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                          <i className="ni text-sm">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </i>
                        </span>
                        <span className="label">Joined</span>
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="actions">
                    <Link
                      to={hash ? '/sign-up' : '/changePassword'}
                      className="edit">
                      Change Password
                    </Link>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;

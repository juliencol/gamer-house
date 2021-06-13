import { userInfo } from '../../Services/AuthenticationServices';
import useFetch from '../use-fetch/useFetch';
import { useEffect, useState } from 'react';
import './Header.css';
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import src from '../../../src/Images/SocialGaming.png'

function Header(props: { logOut: () => void, isAuthenticated : boolean }) {
  const { data } = useFetch({ pseudo: '' }, userInfo().pseudo());
  const [pseudo, setPseudo] = useState('');
  useEffect(() => {
    setPseudo(data.pseudo);
  }, [data]);

  if (props.isAuthenticated) {
    return (
        <Layout.Header className="background">
          <Menu mode="horizontal" defaultSelectedKeys={['home']} className="menu">
            <Menu.Item key="home">
              <Link to="/" style={{color: 'var(--white)', fontSize: '1em', bottom: '-3px'}}>
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="feed">
              <Link
                  to="/feed"
                  style={{color: 'var(--white)', fontSize: '1em', bottom: '-3px'}}
              >
                Feed
              </Link>
            </Menu.Item>
            <Menu.Item key="profile">
              <Link
                  to="/profile"
                  style={{color: 'var(--white)', fontSize: '1em', bottom: '-3px'}}
              >
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item key="disconnect">
              <Link
                  to="/"
                  style={{color: 'var(--white)', fontSize: '1em', bottom: '-3px'}}
                  onClick={() => props.logOut()}
              >
                Log out
              </Link>
            </Menu.Item>
          </Menu>
          <Row align="middle" className="userRow">
            <Col span={2}>
              <img
                  className="avatar"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHQkNOzYqIg7yA0UfPI_ILNRbTvrgXflC6g&usqp=CAU"
              />
            </Col>
            <Col className="pseudo" span={21}>
              {pseudo}
            </Col>
          </Row>
        </Layout.Header>
    );
  }

    return(
    <div className="navBar">
      <Link to="/" style={{color: 'var(--white)', fontSize: '1em', bottom: '-3px'}}>
        <img src={src} alt = "logoSocialGaming" style={{width : "40px", marginLeft : "20px"}}/>
      </Link>
      <div className={"subNavBar"} >
        <div style={{bottom: '-3px', marginRight : "70px", marginTop : "20px"}}>
      <Link to="/about" style={{color: 'var(--white)', fontSize: '1em', bottom: '-3px'}} className={window.location.pathname === "/about" ? "currentLink" : "linkDisconnected"}>
        About
      </Link>
        </div>
        <div style={{bottom: '-3px', marginRight : "70px", marginTop : "20px"}}>
      <Link to="/authentication" style={{color: 'var(--white)', fontSize: '1em', bottom: '-3px', marginRight : "70px", marginTop : "20px"}} className={window.location.pathname !== "/authentication" ? "linkDisconnected" : "currentLink"}>
        Sign In
      </Link>
        </div>
      </div>
    </div>
    );

  function displaySearchGamersResult() {
    return gamersSearchResult?.map((searchedGamer) => (
      <Row>
        <Col>
          <GamerAvatar avatarStyle="avatar" gamer={searchedGamer} />
        </Col>
        <Col className="searchResult">
          <h1>{searchedGamer.pseudo}</h1>
          <strong>{searchedGamer.statusMessage}</strong>
          <br />
          <span>Number of followers: {searchedGamer.followers.length}</span>
        </Col>
      </Row>
    ));
  }

  return (
    <Layout.Header className="background">
      <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Menu mode="horizontal" defaultSelectedKeys={['home']} className="menu">
          <Menu.Item key="home">
            <Link
              to="/"
              style={{ color: 'var(--white)', fontSize: '1em', bottom: '-3px' }}
            >
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="feed">
            <Link
              to="/feed"
              style={{ color: 'var(--white)', fontSize: '1em', bottom: '-3px' }}
            >
              Feed
            </Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link
              to="/profile"
              style={{ color: 'var(--white)', fontSize: '1em', bottom: '-3px' }}
            >
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="search">
            <Input
              placeholder="Search player"
              bordered={false}
              onPressEnter={onSearch}
              style={{ width: 150, color: 'white' }}
            />
          </Menu.Item>
        </Menu>
        <Menu mode="horizontal" className="menu" style={{ marginRight: '40px' }}>
          <Menu.Item key="disconnect">
            <Link
              to="/"
              style={{ color: 'var(--white)', fontSize: '1em', bottom: '-3px' }}
              onClick={() => props.logOut()}
            >
              Log out
            </Link>
          </Menu.Item>
        </Menu>
      </Row>
      <Row align="middle" className="userRow">
        <Col span={2}>
          <GamerAvatar avatarStyle="headerAvatar" gamer={gamer!} />
        </Col>
        <Col span={3}>
          <div className="pseudo">{gamer?.pseudo}</div>
          <Typography.Text
            className="statusMessage"
            editable={{
              onChange: handleChange,
            }}
          >
            {gamer?.statusMessage}
          </Typography.Text>
        </Col>
      </Row>
      <Modal
        title="The following gamers have been found"
        visible={isSearchModalVisible}
        onOk={() => setIsSearchModalVisible(false)}
        onCancel={() => setIsSearchModalVisible(false)}
      >
        {displaySearchGamersResult()}
      </Modal>
    </Layout.Header>
  );
}

export default Header;

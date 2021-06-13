import { useEffect, useState } from 'react';
import { Layout, Menu, Row, Col, Typography, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './Header.css';
import { Gamer } from 'types/Gamer';
import GamerServices from 'Services/GamerServices';
import GamerAvatar from 'Components/GamerAvatar/GamerAvatar';
import logo from 'Images/SocialGaming.png';

function Header(props: { logOut: () => void; isAuthenticated: boolean }) {
  const [gamer, setGamer] = useState<Gamer>();
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [gamersSearchResult, setGamersSearchResult] = useState<Array<Gamer>>();

  useEffect(() => {
    GamerServices.getAuthenticatedGamer().then((gamer) => {
      setGamer(gamer.data);
    });
  }, []);

  function handleChange(e: string) {
    GamerServices.updateGamer({ statusMessage: e }).then((gamer) => {
      setGamer(gamer.data);
    });
  }

  function onSearch(e: any) {
    GamerServices.searchGamers(e.target.value).then((gamers) => {
      setGamersSearchResult(gamers.data);
      setIsSearchModalVisible(true);
    });
  }

  function displaySearchGamersResult() {
    return gamersSearchResult?.map((searchedGamer) => (
      <Row>
        <GamerAvatar avatarStyle="avatar" gamer={searchedGamer} />
        <div>
          <h1>{searchedGamer.pseudo}</h1>
          <strong>{searchedGamer.statusMessage}</strong>
          <br />
          <span>Number of followers: {searchedGamer.followers.length}</span>
        </div>
      </Row>
    ));
  }

  if (props.isAuthenticated) {
    return (
      <Layout.Header className="background">
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Menu mode="horizontal" defaultSelectedKeys={['feed']} className="menu">
            <Menu.Item key="feed">
              <Link
                to="/"
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
            <Menu.Item key="group">
              <Link
                to="/group"
                style={{ color: 'var(--white)', fontSize: '1em', bottom: '-3px' }}
              >
                Group
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

  return (
    <div className="navBar">
      <Link to="/" style={{ color: 'var(--white)', fontSize: '1em', bottom: '-3px' }}>
        <img
          src={logo}
          alt="logoSocialGaming"
          style={{ width: '40px', marginLeft: '20px' }}
        />
      </Link>
      <div className={'subNavBar'}>
        <div style={{ bottom: '-3px', marginRight: '70px', marginTop: '20px' }}>
          <Link
            to="/about"
            style={{ color: 'var(--white)', fontSize: '1em', bottom: '-3px' }}
            className={
              window.location.pathname === '/about' ? 'currentLink' : 'linkDisconnected'
            }
          >
            About
          </Link>
        </div>
        <div style={{ bottom: '-3px', marginRight: '70px', marginTop: '20px' }}>
          <Link
            to="/authentication"
            style={{
              color: 'var(--white)',
              fontSize: '1em',
              bottom: '-3px',
              marginRight: '70px',
              marginTop: '20px',
            }}
            className={
              window.location.pathname !== '/authentication'
                ? 'linkDisconnected'
                : 'currentLink'
            }
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

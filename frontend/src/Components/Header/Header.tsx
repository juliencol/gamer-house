import { userInfo } from 'services/AuthenticationService';
import useFetch from 'components/use-fetch/useFetch';
import { useEffect, useState } from 'react';
import './Header.css';
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function Header(props: { logOut: () => void }) {
  const { data } = useFetch({ pseudo: '' }, userInfo().pseudo());
  const [pseudo, setPseudo] = useState('');
  useEffect(() => {
    setPseudo(data.pseudo);
  }, [data]);

  return (
    <Layout.Header className="background">
      <Menu mode="horizontal" defaultSelectedKeys={['home']} className="menu">
        <Menu.Item key="home">
          <Link to="/" style={{ color: 'var(--white)', fontSize: '1em', bottom: '-3px' }}>
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
      <Row align="middle" className="userRow">
        <Col span={2}>
          <img
            className="avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHQkNOzYqIg7yA0UfPI_ILNRbTvrgXflC6g&usqp=CAU"
            alt=""
          />
        </Col>
        <Col className="pseudo" span={21}>
          {pseudo}
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default Header;

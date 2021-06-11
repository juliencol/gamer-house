<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { userInfo } from '../../Services/AuthenticationServices';
import useFetch from '../use-fetch/useFetch';
=======
=======
>>>>>>> 83e6ba3 (Solved import configs)
<<<<<<< HEAD
=======
import { userInfo } from 'Services/AuthenticationService';
import useFetch from 'Components/use-fetch/useFetch';
>>>>>>> 3cd3394 (Solved import issues)
<<<<<<< HEAD
>>>>>>> 09fa6fe (Solved import issues)
=======
=======
import { userInfo } from '../../Services/AuthenticationServices';
import useFetch from '../use-fetch/useFetch';
>>>>>>> c3e566b (Solved import configs)
>>>>>>> 83e6ba3 (Solved import configs)
import { useEffect, useState } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
=======
import { userInfo } from 'Services/AuthenticationServices';
import useFetch from 'Components/use-fetch/useFetch';
import { useEffect, useState } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

>>>>>>> 91e3dc5 (follow + recherche user + description relié au back + refonte front)
import './Header.css';

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
            alt="avatar"
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

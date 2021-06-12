import './Profile.css';
import {
  Layout,
  Modal,
  Button,
  Upload,
  Typography,
  Avatar,
  Carousel,
  Popconfirm,
  Input,
  Row,
  Col,
} from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  PlusCircleOutlined,
  CheckOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import GamerServices from '../../Services/GamerServices';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { Gamer } from '../../types/Gamer';

const { Header, Footer, Content } = Layout;

function Profile() {
  const [gamer, setGamer] = useState<Gamer>();
  const [gamersSearchResult, setGamersSearchResult] = useState<Array<Gamer>>();
  const [idToUnfollow, setIdToUnfollow] = useState('');
  const { Paragraph } = Typography;
  const [isUnfollowModalVisible, setIsUnfollowModalVisible] = useState(false);
  const [isRGModalVisible, setIsRGModalVisible] = useState(false);
  const [popConfirm, setPopConfirmVisible] = useState(false);
  const [popUnfollowConfirm, setPopUnfollowConfirm] = useState(false);
  const [description, setDescription] = useState('');
  const [isFollowModalVisible, setIsFollowModalVisible] = useState(false);
  const { Search } = Input;
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  };
  const showRGModal = () => {
    setIsRGModalVisible(true);
  };

  const showPopConfim = () => {
    setPopConfirmVisible(true);
  };
  const handleOkRG = () => {
    setPopConfirmVisible(false);
    setTimeout(() => {
      setIsRGModalVisible(false);
    }, 500);
  };

  const handleOkUnfollow = () => {
    setPopUnfollowConfirm(false);
    GamerServices.unfollowGamer(idToUnfollow).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data));
    });
    setTimeout(() => {
      setIsUnfollowModalVisible(false);
    }, 500);
  };

  const handleCancelUnfollow = () => {
    setPopUnfollowConfirm(false);
    setTimeout(() => {
      setIsUnfollowModalVisible(false);
    }, 500);
  };

  const handleCancelRG = () => {
    setPopConfirmVisible(false);
    setTimeout(() => {
      setIsRGModalVisible(false);
    }, 500);
  };
  useEffect(() => {
    GamerServices.getAuthenticatedGamer().then((gamer) => {
      setGamer(gamer.data);
      setDescription(gamer.data.description);
    });
  }, []);

  function onSearch(value: string) {
    GamerServices.searchGamers(value).then((gamers) => {
      setGamersSearchResult(gamers.data);
      console.log(gamers.data);
    });
  }

  function changeDescription(e: any) {
    GamerServices.updateGamer({ description: description }).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => {
        setGamer(gamer.data);
        setDescription(gamer.data.description);
      });
    });
  }

  function followGamer(gamerId: string) {
    GamerServices.followGamer({ idToFollow: gamerId }).then(() =>
      GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data))
    );
  }

  function displaySearchGamersResult() {
    return gamersSearchResult?.map((searchedGamer) => (
      <Row>
        <img
          className="avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHQkNOzYqIg7yA0UfPI_ILNRbTvrgXflC6g&usqp=CAU"
          alt="avatar"
        />
        <div>
          <h1>{searchedGamer.pseudo}</h1>
          <strong>{searchedGamer.statusMessage}</strong>
          <br />
          <span>Number of followers: {searchedGamer.followers.length}</span>
        </div>
        {createFollowButton(searchedGamer._id)}
      </Row>
    ));
  }

  function createFollowButton(id: string) {
    if (gamer?.following?.find((followedGamer) => followedGamer._id === id)) {
      return <Button disabled> Already Followed </Button>;
    }
    return <Button onClick={() => followGamer(id)}>Follow</Button>;
  }

  function displayFollowedGamers() {
    return gamer?.following?.map((followedGamer) => (
      <Row>
        <Col span={1}>
          <img
            className="avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHQkNOzYqIg7yA0UfPI_ILNRbTvrgXflC6g&usqp=CAU"
            alt="avatar"
          />
          <h1>{followedGamer.pseudo}</h1>
          <strong>{followedGamer.statusMessage}</strong>
        </Col>
      </Row>
    ));
  }

  function displaySelectUnfollowGamer() {
    return (
      <select
        name="idToUnfollow"
        className="form-control"
        onChange={handleSelectUnfollowGamer}
        style={{ textAlign: 'center' }}
      >
        <option hidden disabled selected>
          {' '}
          -- Select a gamer to unfollow --{' '}
        </option>
        {gamer?.following?.map((followedGamer) => (
          <option value={followedGamer._id}>
            {followedGamer.pseudo} {followedGamer.statusMessage}
          </option>
        ))}
      </select>
    );
  }

  function handleSelectUnfollowGamer(e: ChangeEvent<HTMLSelectElement>) {
    const value: string = e.target.value;
    setIdToUnfollow(value);
  }

  const profilePicture = File;
  function onFileUpload(event: ChangeEvent<HTMLInputElement>) {}

  function createCarouselGame() {
    const result: Array<JSX.Element> = [];
    for (let i = 0; i < 3; i++) {
      result.push(
        <div className="CarouselImg">
          <h3>Carousel Photo</h3>
        </div>
      );
    }
    return result;
  }

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  return (
    <Layout>
      <Content>
        <Row className="mainRow">
          <Col className="mainColumn" span={6}>
            <h1>Avatar</h1>
            <div>
              <Avatar size={64} icon={<UserOutlined />} />
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Col>
          <Col span={12} className="mainColumn">
            <h1>Description</h1>
            <div className="descriptionTextWrapper">
              <Paragraph editable={{ onChange: setDescription }}>{description}</Paragraph>
            </div>
            <div>
              <Button
                shape="round"
                type="primary"
                size="small"
                onClick={changeDescription}
              >
                Change description
              </Button>
            </div>
          </Col>
          <Col span={6} className="mainColumn">
            <h1>Username</h1>
            <p>{gamer?.pseudo}</p>
          </Col>
        </Row>

        <Row className="mainRow">
          <Col span={6} className="mainColumn">
            <h1>Remove a game</h1>
            <div className="ButtonWrapper">
              <Button shape="round" type="dashed" size="large" onClick={showRGModal}>
                Remove
              </Button>
            </div>
            <Modal
              title="Remove Game Modal"
              visible={isRGModalVisible}
              footer={[
                <Popconfirm
                  title="Are you sure to Remove these Games ?"
                  okText="Yes"
                  cancelText="No"
                  visible={popConfirm}
                  onConfirm={handleOkRG}
                  onCancel={handleCancelRG}
                ></Popconfirm>,
                <Button key="cancel" onClick={handleCancelRG}>
                  Cancel
                </Button>,
                <Button danger key="remove" onClick={showPopConfim}>
                  Remove
                </Button>,
              ]}
            ></Modal>
          </Col>

          <Col span={12} className="mainColumn">
            <h1>I play the following games</h1>
          </Col>
          <Col span={6} className="mainColumn">
            <h1>Add a game</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                type="dashed"
                size="large"
                onClick={showRGModal}
                icon={<PlusCircleTwoTone twoToneColor="#6f4071" />}
              >
                Add
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mainRow">
          <Col span={6} className="mainColumn">
            <h1>Unfollow a gamer</h1>
            <div className="ButtonWrapper">
              <Button shape="round" onClick={() => setIsUnfollowModalVisible(true)}>
                Unfollow -
              </Button>
            </div>
            <Modal
              title="Unfollow"
              visible={isUnfollowModalVisible}
              footer={[
                <Popconfirm
                  title="Are you sure you want to unfollow this gamer?"
                  okText="Yes"
                  cancelText="No"
                  visible={popUnfollowConfirm}
                  onConfirm={handleOkUnfollow}
                  onCancel={handleCancelUnfollow}
                ></Popconfirm>,
                <Button key="cancel" onClick={() => setIsUnfollowModalVisible(false)}>
                  Cancel
                </Button>,
                <Button
                  danger
                  key="remove"
                  onClick={() => setPopUnfollowConfirm(true)}
                  icon={<CheckOutlined />}
                >
                  Remove
                </Button>,
              ]}
            >
              {displaySelectUnfollowGamer()}
            </Modal>
          </Col>
          <Col span={12} className="mainColumn">
            <h1>I Follow</h1>
            {displayFollowedGamers()}
          </Col>
          <Col span={6} className="mainColumn">
            <h1>Follow a gamer</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                onClick={() => setIsFollowModalVisible(true)}
                size="large"
              >
                Follow +
              </Button>
            </div>
            <Modal
              title="Follow a gamer"
              visible={isFollowModalVisible}
              onOk={() => setIsFollowModalVisible(false)}
              onCancel={() => setIsFollowModalVisible(false)}
            >
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{ width: 200 }}
              />
              {displaySearchGamersResult()}
            </Modal>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
export default Profile;

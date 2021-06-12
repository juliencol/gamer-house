import './Profile.css';
import {
  Layout,
  Modal,
  Button,
  Upload,
  Typography,
  Avatar,
  message,
  Carousel,
  Popconfirm,
  Input,
  Row,
  Col,
} from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  CheckOutlined,
  PlusCircleTwoTone,
  DeleteOutlined,
} from '@ant-design/icons';
import GamerServices from 'Services/GamerServices';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { Gamer } from 'types/Gamer';

function Profile() {
  const [gamer, setGamer] = useState<Gamer>();
  const [gamersSearchResult, setGamersSearchResult] = useState<Array<Gamer>>();
  const [idToUnfollow, setIdToUnfollow] = useState('');
  const [isUnfollowModalVisible, setIsUnfollowModalVisible] = useState(false);
  const [isRGModalVisible, setIsRGModalVisible] = useState(false);
  const [popConfirm, setPopConfirmVisible] = useState(false);
  const [popUnfollowConfirm, setPopUnfollowConfirm] = useState(false);
  const [description, setDescription] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [isFollowModalVisible, setIsFollowModalVisible] = useState(false);
  const [avatar, setAvatar] = useState<string>('');

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
    }, 200);
  };

  const handleCancelRG = () => {
    setPopConfirmVisible(false);
    setTimeout(() => {
      setIsRGModalVisible(false);
    }, 100);
  };

  const handleOkUnfollow = () => {
    setPopUnfollowConfirm(false);
    GamerServices.unfollowGamer(idToUnfollow).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data));
    });
    setTimeout(() => {
      setIsUnfollowModalVisible(false);
    }, 200);
  };

  const handleCancelUnfollow = () => {
    setPopUnfollowConfirm(false);
    setTimeout(() => {
      setIsUnfollowModalVisible(false);
    }, 100);
  };

  useEffect(() => {
    GamerServices.getAuthenticatedGamer().then((gamer) => {
      setGamer(gamer.data);
      setDescription(gamer.data.description);
      setPseudo(gamer.data.pseudo);
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

  function changePseudo(e: any) {
    GamerServices.updateGamer({ pseudo: pseudo }).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => {
        setGamer(gamer.data);
        setPseudo(gamer.data.pseudo);
      });
    });
  }

  function followGamer(gamerId: string) {
    GamerServices.followGamer({ idToFollow: gamerId }).then(() =>
      GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data))
    );
  }

  function uploadAvatar() {
    if (avatar !== '') {
      GamerServices.changeAvatar({ avatarToChange: avatar }).then(() =>
        GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data))
      );
    }
  }

  function loadAvatar(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setAvatar(reader.result as string);
        console.log(reader.result);
      };
    }
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

  function displayGamers(gamers: [Gamer] | undefined) {
    return gamers?.map((gamer) => (
      <Col>
        <img
          className="avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHQkNOzYqIg7yA0UfPI_ILNRbTvrgXflC6g&usqp=CAU"
          alt="avatar"
        />
        <h1>{gamer.pseudo}</h1>
        <strong>{gamer.statusMessage}</strong>
      </Col>
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

  return (
    <Layout>
      <Layout.Content>
        <Row className="mainRow">
          <Col className="mainColumn" span={6}>
            <h1>Avatar</h1>
            <div className="image-upload">
              <label htmlFor="avatar">
                <Avatar className="avatarImage" size={64} src={gamer?.profilePicture} />
              </label>
              <input type="file" id="avatar" onChange={loadAvatar} />
            </div>
            <br />
            <div className="ButtonWrapper">
              <Button shape="round" onClick={() => uploadAvatar()}>
                Confirm change
              </Button>
            </div>
          </Col>
          <Col span={12} className="mainColumn">
            <h1>Description</h1>
            <div className="descriptionTextWrapper">
              <Typography.Paragraph
                editable={{ onChange: setDescription, maxLength: 200 }}
              >
                {description}
              </Typography.Paragraph>
            </div>
            <div>
              <Button
                shape="round"
                type="primary"
                size="small"
                onClick={changeDescription}
              >
                Confirm description changes
              </Button>
            </div>
          </Col>
          <Col span={6} className="mainColumn">
            <div>
              <h1>Username</h1>
              <Typography.Text editable={{ onChange: setPseudo, maxLength: 15 }}>
                {pseudo}
              </Typography.Text>
            </div>
            <div>
              <Button shape="round" type="primary" size="small" onClick={changePseudo}>
                Confirm pseudo changes
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mainRow">
          <Col span={6} className="mainColumn">
            <h1>Remove a game</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                type="default"
                size="large"
                icon={<DeleteOutlined />}
                onClick={showRGModal}
              >
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
                type="default"
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
            <Row className="gamersRow">{displayGamers(gamer?.following)}</Row>
          </Col>
          <Col span={6} className="mainColumn">
            <h1>Follow a gamer</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                onClick={() => setIsFollowModalVisible(true)}
                size="large"
                icon={<PlusCircleTwoTone twoToneColor="#6f4071" />}
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
              <Input.Search
                placeholder="Follow a player"
                onSearch={onSearch}
                style={{ width: 200 }}
              />
              {displaySearchGamersResult()}
            </Modal>
          </Col>
        </Row>
        <Row className="mainRow">
          <Col span={12} className="mainColumn">
            <h1>Followed By</h1>
            <Row className="gamersRow">{displayGamers(gamer?.followers)}</Row>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
export default Profile;

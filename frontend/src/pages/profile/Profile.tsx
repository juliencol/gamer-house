import './Profile.css';
import {
  Layout,
  Modal,
  Button,
  Typography,
  Avatar,
  Popconfirm,
  Input,
  Row,
  Col,
  Form,
} from 'antd';
import {
  CheckOutlined,
  PlusOutlined,
  DeleteOutlined,
  UserDeleteOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import GamerServices from 'Services/GamerServices';
import GameServices from 'Services/GameServices';
import { ChangeEvent, useEffect, useState } from 'react';
import { Gamer, GameWithRank } from 'types/Gamer';
import { Game } from 'types/Game';

export type gameWithRank = 'gameId' | 'rank';

function Profile() {
  const defaultGameWithRank: { [key in gameWithRank]: string } = {
    gameId: '',
    rank: '',
  };
  const [gamer, setGamer] = useState<Gamer>();
  const [games, setGames] = useState<Array<Game>>();
  const [gameToAdd, setGameToAdd] = useState(defaultGameWithRank);
  const [gameToRemove, setGameToRemove] = useState('');
  const [gamersSearchResult, setGamersSearchResult] = useState<Array<Gamer>>();
  const [idToUnfollow, setIdToUnfollow] = useState('');
  const [isFollowModalVisible, setIsFollowModalVisible] = useState(false);
  const [isUnfollowModalVisible, setIsUnfollowModalVisible] = useState(false);
  const [isRemoveGameModalVisible, setIsRemoveGameModalVisible] = useState(false);
  const [isAddGameModalVisible, setIsAddGameModalVisible] = useState(false);
  const [isChangeInfoModalVisible, setIsChangeInfoModalVisible] = useState(false);
  const [popConfirm, setPopConfirmVisible] = useState(false);
  const [popUnfollowConfirm, setPopUnfollowConfirm] = useState(false);
  const [confirmLoadingAddGame, setConfirmLoadingAddGame] = useState(false);
  const [confirmLoadingRemoveGame, setConfirmLoadingRemoveGame] = useState(false);

  const showPopConfim = () => {
    setPopConfirmVisible(true);
  };
  const handleOkRemoveGame = () => {
    setConfirmLoadingRemoveGame(true);

    setTimeout(() => {
      setPopConfirmVisible(false);
    }, 1000);
    GameServices.removeGameFromGamer(gameToRemove).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data));
    });
    setTimeout(() => {
      setIsRemoveGameModalVisible(false);
      setConfirmLoadingRemoveGame(false);
    }, 1300);
  };

  const handleCancelRemoveGame = () => {
    setPopConfirmVisible(false);
    setTimeout(() => {
      setIsRemoveGameModalVisible(false);
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

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinishEmailForm = (value: any) => {
    console.log(value);
    GamerServices.updateGamer(value).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => {
        setGamer(gamer.data);
      });
    });
    // handleOk();
  };

  const onFinishFailedEmailForm = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishPasswordForm = (value: any) => {
    if (value.newPassword === value.confirmPassword) {
      console.log(value);
      GamerServices.changePassword({
        currentPassword: value.currentPassword,
        password: value.newPassword,
      }).then(() => {
        GamerServices.getAuthenticatedGamer().then((gamer) => {
          setGamer(gamer.data);
          console.log('Password Changed');
        });
      });
    }
  };

  const onFinishFailedPasswordForm = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    GamerServices.getAuthenticatedGamer().then((gamer) => {
      setGamer(gamer.data);
    });
    GameServices.getGames().then((games) => {
      setGames(games.data);
    });
  }, []);

  function onSearch(value: string) {
    GamerServices.searchGamers(value).then((gamers) => {
      setGamersSearchResult(gamers.data);
    });
  }

  function handleChangeDescription(value: string) {
    GamerServices.updateGamer({ description: value }).then((gamer) => {
      setGamer(gamer.data);
    });
  }

  function handleChangePseudo(value: string) {
    GamerServices.updateGamer({ pseudo: value }).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => {
        setGamer(gamer.data);
      });
    });
  }

  function followGamer(gamerId: string) {
    GamerServices.followGamer({ idToFollow: gamerId }).then(() =>
      GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data))
    );
  }

  function loadAvatar(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const avatar = reader.result as string;
        if (avatar !== '') {
          GamerServices.changeAvatar({ avatarToChange: avatar }).then(() =>
            GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data))
          );
        }
      };
    }
  }

  function displaySearchGamersResult() {
    return gamersSearchResult?.map((searchedGamer) => (
      <Row>
        <img className="avatar" src={searchedGamer.profilePicture} />
        <div>
          <h1 style={{ margin: '0px', padding: '0px' }}>{searchedGamer.pseudo}</h1>
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
      return (
        <Col className="followButton">
          <Button disabled> Already Followed </Button>
        </Col>
      );
    }
    return (
      <Col className="followButton">
        <Button onClick={() => followGamer(id)}>Follow</Button>
      </Col>
    );
  }

  function displayGamers(gamers: [Gamer] | undefined) {
    return gamers?.map((gamer) => (
      <Col>
        <img className="avatar" src={gamer.profilePicture} alt="avatar" />
        <h1 style={{ margin: '0px' }}>{gamer.pseudo}</h1>
        {gamer.statusMessage}
      </Col>
    ));
  }

  function displayGame(gameWithRanks: GameWithRank) {
    return (
      <Col>
        <Avatar shape="square" src={gameWithRanks.game.picture} size={64} />
        <h4>{gameWithRanks.game.name}</h4>
        <h6>{gameWithRanks.rank}</h6>
      </Col>
    );
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
          <option value={followedGamer._id}>{followedGamer.pseudo}</option>
        ))}
      </select>
    );
  }

  function displaySelectAddGame() {
    return (
      <select
        name="addGame"
        className="form-control"
        onChange={handleSelectAddGame}
        style={{ textAlign: 'center' }}
      >
        <option hidden disabled selected>
          {' '}
          -- Select a game to add --{' '}
        </option>
        {games?.map((game) => (
          <option value={game._id}>{game.name}</option>
        ))}
      </select>
    );
  }

  function displaySelectRemoveGame() {
    let name = '';
    let id = '';
    return (
      <select
        name="removeGame"
        className="form-control"
        onChange={handleSelectRemoveGame}
        style={{ textAlign: 'center' }}
      >
        <option hidden disabled selected>
          {' '}
          -- Select a game to remove --{' '}
        </option>
        {gamer?.gamesWithRank.map((gameWithRanks) => {
          return (
            <option value={gameWithRanks.game._id}>{gameWithRanks.game.name}</option>
          );
        })}
      </select>
    );
  }

  function handleSelectUnfollowGamer(e: ChangeEvent<HTMLSelectElement>) {
    const value: string = e.target.value;
    setIdToUnfollow(value);
  }

  function handleSelectAddGame(e: ChangeEvent<HTMLSelectElement>) {
    const value: string = e.target.value;
    setGameToAdd({
      ...gameToAdd,
      gameId: value,
    });
  }

  function handleSelectRemoveGame(e: ChangeEvent<HTMLSelectElement>) {
    const value: string = e.target.value;
    setGameToRemove(value);
  }

  function handleChangeAddGame(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;
    setGameToAdd({
      ...gameToAdd,
      rank: value,
    });
  }

  function handleOkAddGame() {
    GameServices.addGameToGamer({ game: gameToAdd.gameId, rank: gameToAdd.rank }).then(
      () => GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data))
    );
    setConfirmLoadingAddGame(true);
    setTimeout(() => {
      setIsAddGameModalVisible(false);
      setConfirmLoadingAddGame(false);
    }, 1000);
  }

  function handleCancelAddGame() {
    setIsAddGameModalVisible(false);
  }

  return (
    <Layout>
      <Layout.Content>
        <Row className="mainRow">
          <Col className="mainColumn" span={6}>
            <h1>Avatar</h1>
            <div className="image-upload">
              <label htmlFor="avatar">
                <Avatar className="avatarImage" size={115} src={gamer?.profilePicture} />
              </label>
              <input type="file" id="avatar" onChange={loadAvatar} />
            </div>
          </Col>
          <Col span={12} className="mainColumn">
            <h1>Description</h1>
            <div className="descriptionTextWrapper">
              <Typography.Paragraph
                editable={{ onChange: handleChangeDescription, maxLength: 400 }}
              >
                {gamer?.description}
              </Typography.Paragraph>
            </div>
          </Col>
          <Col span={6} className="mainColumn">
            <div>
              <h1>Username</h1>
              <div className="usernameWrapper">
                <Typography.Text
                  className="usernameTypography"
                  editable={{ onChange: handleChangePseudo }}
                >
                  {gamer?.pseudo}
                </Typography.Text>
              </div>
              <div style={{ position: 'relative', bottom: '-30px' }}>
                <Button
                  type="default"
                  shape="round"
                  size="middle"
                  onClick={() => setIsChangeInfoModalVisible(true)}
                >
                  Change more information
                </Button>

                <Modal
                  title="Change your informations"
                  visible={isChangeInfoModalVisible}
                  closable={false}
                  footer={[
                    <Button
                      type="primary"
                      onClick={() => setIsChangeInfoModalVisible(false)}
                    >
                      Finish changes
                    </Button>,
                  ]}
                >
                  <div className="emailWrapper">
                    <Form
                      {...layout}
                      name="basic"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinishEmailForm}
                      onFinishFailed={onFinishFailedEmailForm}
                    >
                      <Form.Item
                        label="Email"
                        name="email"
                        initialValue={gamer?.email}
                        rules={[
                          {
                            required: true,
                            message: 'Please write a correct email',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                          Confirm e-mail change
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>

                  <div className="passwordWrapper">
                    <Form
                      {...layout}
                      name="basic"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinishPasswordForm}
                      onFinishFailed={onFinishFailedPasswordForm}
                    >
                      <Form.Item
                        label="Current Password"
                        name="currentPassword"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your old password',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your new password',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your new password',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                          Confirm password change
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </Modal>
              </div>
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
                onClick={() => setIsRemoveGameModalVisible(true)}
              >
                Remove
              </Button>
            </div>
            <Modal
              title="Remove a game from your game list"
              visible={isRemoveGameModalVisible}
              closable={false}
              footer={[
                <Popconfirm
                  title="Are you sure you want to remove this game ?"
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ loading: confirmLoadingRemoveGame }}
                  visible={popConfirm}
                  onConfirm={handleOkRemoveGame}
                  onCancel={handleCancelRemoveGame}
                ></Popconfirm>,
                <Button key="cancel" onClick={handleCancelRemoveGame}>
                  Cancel
                </Button>,
                <Button
                  danger
                  key="remove"
                  icon={<DeleteOutlined />}
                  onClick={showPopConfim}
                >
                  Remove
                </Button>,
              ]}
            >
              {displaySelectRemoveGame()}
            </Modal>
          </Col>

          <Col span={12} className="mainColumn">
            <h1>I play the following games</h1>
            <Row className="gamersRow">
              {gamer?.gamesWithRank.map((gameWithRank) => displayGame(gameWithRank))}
            </Row>
          </Col>

          <Col span={6} className="mainColumn">
            <h1>Add a game</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                type="default"
                size="large"
                onClick={() => setIsAddGameModalVisible(true)}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
              <Modal
                title="Add a game to your game list"
                visible={isAddGameModalVisible}
                closable={false}
                footer={[
                  <Button key="cancel" onClick={() => setIsAddGameModalVisible(false)}>
                    Cancel
                  </Button>,
                  <Button
                    type="primary"
                    key="Ok"
                    loading={confirmLoadingAddGame}
                    onClick={handleOkAddGame}
                  >
                    Add Game
                  </Button>,
                ]}
              >
                {displaySelectAddGame()}
                <Input
                  id="rank"
                  name="rank"
                  onChange={handleChangeAddGame}
                  value={gameToAdd.rank}
                ></Input>
              </Modal>
            </div>
          </Col>
        </Row>

        <Row className="mainRow">
          <Col span={6} className="mainColumn">
            <h1>Unfollow a gamer</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                icon={<UserDeleteOutlined />}
                size="large"
                onClick={() => setIsUnfollowModalVisible(true)}
              >
                Unfollow
              </Button>
            </div>
            <Modal
              title="Unfollow a gamer"
              visible={isUnfollowModalVisible}
              closable={false}
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
            <h1>I follow</h1>
            <Row className="gamersRow">{displayGamers(gamer?.following)}</Row>
          </Col>
          <Col span={6} className="mainColumn">
            <h1>Follow a gamer</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                onClick={() => setIsFollowModalVisible(true)}
                size="large"
                icon={<UserAddOutlined />}
              >
                Follow
              </Button>
            </div>
            <Modal
              title="Follow a gamer"
              visible={isFollowModalVisible}
              closable={false}
              footer={[
                <Button type="primary" onClick={() => setIsFollowModalVisible(false)}>
                  Close
                </Button>,
              ]}
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
            <h1>Followed by</h1>
            <Row className="gamersRow">{displayGamers(gamer?.followers)}</Row>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
export default Profile;

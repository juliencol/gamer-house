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
import { CheckOutlined, PlusCircleTwoTone, DeleteOutlined } from '@ant-design/icons';
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
  const [popConfirm, setPopConfirmVisible] = useState(false);
  const [popUnfollowConfirm, setPopUnfollowConfirm] = useState(false);
  const [avatar, setAvatar] = useState<string>('');

  const showPopConfim = () => {
    setPopConfirmVisible(true);
  };
  const handleOkRemoveGame = () => {
    setPopConfirmVisible(false);
    GameServices.removeGameFromGamer(gameToRemove).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data));
    });
    setTimeout(() => {
      setIsRemoveGameModalVisible(false);
    }, 200);
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
        <h1>{gamer.pseudo}</h1>
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
          <option value={followedGamer._id}>
            {followedGamer.pseudo} {followedGamer.statusMessage}
          </option>
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
  }

  return (
    <Layout>
      <Layout.Content>
        <Row className="mainRow firstRow">
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
                editable={{ onChange: handleChangeDescription, maxLength: 200 }}
              >
                {gamer?.description}
              </Typography.Paragraph>
            </div>
          </Col>
          <Col span={6} className="mainColumn">
            <div>
              <h1>Username</h1>
              <Typography.Text editable={{ onChange: handleChangePseudo, maxLength: 15 }}>
                {gamer?.pseudo}
              </Typography.Text>
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
              footer={[
                <Popconfirm
                  title="Are you sure you want to remove this game ?"
                  okText="Yes"
                  cancelText="No"
                  visible={popConfirm}
                  onConfirm={handleOkRemoveGame}
                  onCancel={handleCancelRemoveGame}
                ></Popconfirm>,
                <Button key="cancel" onClick={handleCancelRemoveGame}>
                  Cancel
                </Button>,
                <Button danger key="remove" onClick={showPopConfim}>
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
                icon={<PlusCircleTwoTone twoToneColor="#6f4071" />}
              >
                Add
              </Button>
              <Modal
                title="Add a game to your game list"
                visible={isAddGameModalVisible}
                okText="Add Game"
                onOk={handleOkAddGame}
                onCancel={() => setIsAddGameModalVisible(false)}
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
              <Button shape="round" onClick={() => setIsUnfollowModalVisible(true)}>
                Unfollow -
              </Button>
            </div>
            <Modal
              title="Unfollow a gamer"
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
            <h1>Followed by</h1>
            <Row className="gamersRow">{displayGamers(gamer?.followers)}</Row>
          </Col>
        </Row>
        <Row className="mainRow">
          <Col span={12} className="mainColumn">
            <h1>My groups</h1>
            <p>You don't have any groups</p>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
export default Profile;

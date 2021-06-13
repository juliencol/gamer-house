import { useState } from 'react';
import { Gamer, GameWithRank } from 'types/Gamer';
import { Row, Col, Modal } from 'antd';
import './GamerAvatar.css';
import GamerServices from 'Services/GamerServices';

interface propsGamerAvatar {
  avatarStyle?: string;
  gamer: Gamer;
}

function GamerAvatar(props: propsGamerAvatar) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentGamer, setCurrentGamer] = useState<Gamer>();

  function displayGamers(gamers: [Gamer] | undefined) {
    return gamers?.map((gamer) => (
      <Col className="centerCol">
        <img className="subAvatar" src={gamer.profilePicture} alt="avatar" />
        <h4>{gamer.pseudo}</h4>
      </Col>
    ));
  }

  function displayGames(gamesWithRank: [GameWithRank] | undefined) {
    if (gamesWithRank && gamesWithRank.length > 0) {
      return gamesWithRank?.map((gameWithRank) => (
        <Col className="centerCol">
          <img
            className="gameImage"
            src={gameWithRank.game?.picture}
            alt={gameWithRank.game?.name}
          />
          <h4>{gameWithRank.game?.name}</h4>
          <h6>{gameWithRank.rank}</h6>
        </Col>
      ));
    }
  }

  function openProfileModal(gamerId: string) {
    GamerServices.getGamer(gamerId).then((gamer) => setCurrentGamer(gamer.data));
    setIsModalVisible(true);
  }

  if (props.gamer) {
    return (
      <>
        <img
          className={`mainAvatar ${props.avatarStyle}`}
          src={props.gamer.profilePicture}
          alt="avatar"
          onClick={() => openProfileModal(props.gamer._id)}
        />
        <Modal
          title={
            <Row>
              <Col>
                <img className="subAvatar" src={currentGamer?.profilePicture} alt="avatar" />
              </Col>
              <Col className="playerStatus">
                <h1>{currentGamer?.pseudo}</h1>
                <h4>{currentGamer?.statusMessage}</h4>
              </Col>
            </Row>
          }
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
        >
          <h1>Plays the following games</h1>
          <Row justify="space-around">{displayGames(currentGamer?.gamesWithRank)}</Row>

          <h1>Follows</h1>
          <Row justify="space-around">{displayGamers(currentGamer?.following)}</Row>

          <h1>Is followed by</h1>
          <Row justify="space-around">{displayGamers(currentGamer?.followers)}</Row>
        </Modal>
      </>
    );
  }

  return <></>;
}

export default GamerAvatar;

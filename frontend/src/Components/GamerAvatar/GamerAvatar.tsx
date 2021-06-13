import { useState } from 'react';
import { Gamer, GameWithRank } from 'types/Gamer';
import { Avatar, Col, Modal } from 'antd';
import './GamerAvatar.css';

function GamerAvatar(props: { gamer: Gamer | undefined }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function displayGamers(gamers: [Gamer] | undefined) {
    return gamers?.map((gamer) => (
      <Col>
        <img className="subAvatar" src={gamer.profilePicture} alt="avatar" />
        <h1>{gamer.pseudo}</h1>
      </Col>
    ));
  }

  function displayGames(gamesWithRank: [GameWithRank] | undefined) {
    return gamesWithRank?.map((gameWithRank) => (
      <Col>
        <img src={gameWithRank.game.picture} />
        <h4>{gameWithRank.game.name}</h4>
        <h6>{gameWithRank.rank}</h6>
      </Col>
    ));
  }

  if (props.gamer) {
    return (
      <>
        <img
          className="mainAvatar"
          src={props.gamer.profilePicture}
          alt="avatar"
          onClick={() => setIsModalVisible(true)}
        />
        <Modal
          title={props.gamer.pseudo}
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
        >
          <h1>{props.gamer.pseudo} plays the following games</h1>
          {displayGames(props.gamer.gamesWithRank)}

          <h1>{props.gamer.pseudo} follows</h1>
          {displayGamers(props.gamer.following)}

          <h1>{props.gamer.pseudo} is followed by</h1>
          {displayGamers(props.gamer.followers)}
        </Modal>
      </>
    );
  }

  return <></>;
}

export default GamerAvatar;

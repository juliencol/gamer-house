import { Button, Card } from 'antd';
import GamerAvatar from 'Components/GamerAvatar/GamerAvatar';
import { Gamer } from 'types/Gamer';
import './Comment.css';

interface propsComment {
  writer: Gamer;
  children: string;
}

function Comment(props: propsComment) {
  return (
    <Card
      bordered={false}
      title={
        <div className="writer">
          <GamerAvatar avatarStyle="commentAvatar" gamer={props.writer} />
          {props.writer.pseudo}
        </div>
      }
    >
      <p>{props.children}</p>
    </Card>
  );
}

export default Comment;

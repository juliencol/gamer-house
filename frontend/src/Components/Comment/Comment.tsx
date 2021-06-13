import { Button, Card } from 'antd';
import { Gamer } from 'types/Gamer';

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
          <img
            style={{ height: '32px', width: 'auto' }}
            src={props.writer.profilePicture}
          />
          {props.writer.pseudo}
        </div>
      }
    >
      <p>{props.children}</p>
    </Card>
  );
}

export default Comment;

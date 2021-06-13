import { CommentOutlined } from '@ant-design/icons';
import { Button, Card, Collapse } from 'antd';
import { useEffect, useState } from 'react';
import CommentServices from 'Services/CommentServices';
import { Comment as IComment } from 'types/Comment';
import { Post } from 'types/Post';
import AddComment from './AddComment';
import Comment from './Comment';

function CommentCollapse(props: { post: Post }) {
  const [comments, setComments] = useState<Array<IComment>>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      CommentServices.getComments(props.post._id)
        .then((resp) => setComments(resp.data))
        .catch((err) => alert('Something wen wrong...\n' + err.message));
    }
  }, [refresh]);

  function refetch() {
    setRefresh(!refresh);
  }

  return (
    <Collapse bordered={false} onChange={refetch}>
      <Collapse.Panel
        header={
          <>
            Comments
          </>
        }
        key={props.post._id}
      >
        {comments.map((comment) => (
          <Comment writer={comment.writer} key={comment.commentId}>
            {comment.content}
          </Comment>
        ))}
        <AddComment
          post={props.post._id}
          refresh={() => {
            setRefresh(false);
            setRefresh(true);
          }}
        />
      </Collapse.Panel>
    </Collapse>
  );
}

export default CommentCollapse;

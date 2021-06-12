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
      CommentServices.getComments(props.post.id)
        .then((resp) => setComments(resp.data))
        .catch((err) => alert('Something wen wrong...\n' + err.message));
    }
  }, [refresh]);

  function refetch() {
    setRefresh(!refresh);
  }

  return (
    <Collapse bordered={false} onChange={refetch}>
      <Collapse.Panel header="Comments" key={props.post.id}>
        {comments.map((comment) => (
          <Comment writer={props.post.writer} key={comment.commentId}>
            {comment.content}
          </Comment>
        ))}
        <Comment writer={props.post.writer} key={'sdsdcomment.commentId'}>
          {'cqsddsqsqdsqd'}
        </Comment>
        <Comment writer={props.post.writer} key={'comment.commentId'}>
          {'sqddsqsdqsdq'}
        </Comment>
        <AddComment postId={props.post.id} />
      </Collapse.Panel>
    </Collapse>
  );
}

export default CommentCollapse;

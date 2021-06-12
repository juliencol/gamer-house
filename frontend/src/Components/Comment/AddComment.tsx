import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import CommentServices from 'Services/CommentServices';
import { CreateCommentArgs } from 'types/Comment';

function AddComment(props: { postId: string }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentData, setCommentData] = useState<CreateCommentArgs>({
    ...props,
    content: '',
  });

  function handleOk() {
    setIsModalVisible(false);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  function onFinish() {
    if (commentData.content.length > 0) {
      CommentServices.createComment(commentData).then(() => {
        handleOk();
      });
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Answer
      </Button>
      <Modal
        title="Add a comment"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[<Button onClick={handleCancel}>Cancel</Button>]}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: 'Please input your comment!',
              },
            ]}
          >
            <Input.TextArea
              value={commentData.content}
              onChange={(event) =>
                setCommentData({ ...commentData, content: event.target.value })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add this comment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddComment;

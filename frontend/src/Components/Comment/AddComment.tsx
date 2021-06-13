import { CommentOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import CommentServices from 'Services/CommentServices';
import { CreateCommentArgs } from 'types/Comment';

function AddComment(props: { post: string; refresh: () => void }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addCommentForm] = Form.useForm();
  const [commentData, setCommentData] = useState<CreateCommentArgs>({
    ...props,
    content: '',
  });

  function handleOk() {
    setIsModalVisible(false);
    setCommentData({ ...commentData, content: '' });
  }

  function handleCancel() {
    setIsModalVisible(false);
    setCommentData({ ...commentData, content: '' });
    addCommentForm.resetFields();
  }

  function onFinish() {
    if (commentData.content.length > 0) {
      CommentServices.createComment(commentData)
        .then(() => {
          props.refresh();
          handleOk();
        })
        .catch(() => alert("We can't save this comment yet, try again in a few minutes"));
    }
  }

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        icon={<CommentOutlined />}
      >
        Answer
      </Button>
      <Modal
        title="Add a comment"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[<Button onClick={handleCancel}>Cancel</Button>]}
      >
        <Form name="basic" onFinish={onFinish} form={addCommentForm}>
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
              onChange={(event) =>
                setCommentData({ ...commentData, content: event.target.value })
              }
            ></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
              Add this comment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddComment;

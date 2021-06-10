import { ChangeEvent, useEffect, useState } from 'react';
import { Affix, Button, Card, Modal, Form, Input, Row, Col, Avatar } from 'antd';

import GamerServices from 'Services/GamerServices';
import PostServices from 'Services/PostServices';
import PostTagServices from 'Services/PostTagServices';
import Meta from 'antd/lib/card/Meta';
import { Post } from 'types/Post';
import { PostTag } from 'types/PostTag';

import './Feed.css';

function Feed() {
  const [filterState, setFilterState] = useState<Array<string>>([]);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [postTags, setPostTags] = useState<Array<PostTag>>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    PostServices.getPosts().then((posts) => {
      setPosts(posts.data);
    });
    PostTagServices.getPostTags().then((postTags) => {
      setPostTags(postTags.data);
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  const onFinish = (values: any) => {
    GamerServices.createPost(values);
    handleOk();
    PostServices.getPosts().then((posts) => {
      setPosts(posts.data);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  function onFilterButtonClick(event: ChangeEvent<HTMLInputElement>) {
    if (filterState.some((tag) => event.target.name === tag)) {
      setFilterState(filterState.filter((tag) => event.target.name !== tag));
    } else {
      setFilterState([...filterState, event.target.name]);
    }
  }

  function displayPosts() {
    const result: Array<JSX.Element> = [];
    for (let i = 0; i < posts.length; i++) {
      result.push(
        <Card key={i} className="post" bordered={false} title={posts[i].writer.pseudo}>
          <Meta
            avatar={
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHQkNOzYqIg7yA0UfPI_ILNRbTvrgXflC6g&usqp=CAU" />
            }
            title={posts[i].name}
            description={posts[i].content}
          />
        </Card>
      );
    }
    return result;
  }

  return (
    <>
      <br />
      <Row justify="space-around">
        <Col span={4}>
          <Affix>
            {postTags.map((tag) => (
              <div key={tag.name}>
                <label htmlFor={tag.name}>{tag.name} </label>
                <input
                  type="checkbox"
                  name={tag.name}
                  id={tag.name}
                  onChange={onFilterButtonClick}
                  checked={filterState.some((selectedTag) => tag.name === selectedTag)}
                />
                <br />
              </div>
            ))}
            <p>{filterState}</p>
            <Button onClick={() => setFilterState([])} shape="round">
              Reset
            </Button>
          </Affix>
        </Col>

        <Col span={12}>
          <div id="posts">{displayPosts()}</div>
        </Col>

        <Col span={4}>
          <Affix>
            <h3>Share something</h3>
            <Button size="large" onClick={showModal} shape="round">
              Add a post
            </Button>
          </Affix>
        </Col>

        <Modal
          title="Add a post"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input the name of your post!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Please input the content of your post!',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
}

export default Feed;

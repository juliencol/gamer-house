import { ChangeEvent, useEffect, useState } from 'react';
import {
  Affix,
  Button,
  Card,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Avatar,
  Tag,
  Select,
} from 'antd';

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
    GamerServices.createPost(values).then(() => {
      PostServices.getPosts().then((posts) => {
        setPosts(posts.data);
      });
    });
    handleOk();
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
    posts.forEach((post) => {
      const postTags = displayPostTags(post.tags);
      result.push(
        <Card
          className="post"
          bordered={false}
          title={
            <div className="title">
              {post.writer.pseudo}
              <div>{postTags}</div>
            </div>
          }
        >
          <Meta
            avatar={
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHQkNOzYqIg7yA0UfPI_ILNRbTvrgXflC6g&usqp=CAU" />
            }
            title={post.name}
            description={post.content}
          />
        </Card>
      );
    });
    return result;
  }

  function displayPostTags(postTags: PostTag[]) {
    const result: Array<JSX.Element> = [];
    postTags.forEach((postTag) => {
      result.push(<Tag color={postTag.category}>{postTag.name}</Tag>);
    });
    return result;
  }

  const options = postTags.map((postTag) => {
    return {
      value: postTag.name,
    };
  });

  function tagRender(props: any) {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="gold"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
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

            <Form.Item
              label="Tags"
              name="tags"
              rules={[
                {
                  required: true,
                  message: 'Please select at least a tag for your post!',
                },
              ]}
            >
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                style={{ width: '100%' }}
                options={options}
              />
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

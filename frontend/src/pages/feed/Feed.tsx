import { useEffect, useState } from 'react';
import { Affix, Button, Card, Modal, Form, Input, Row, Col, Tag, Select } from 'antd';

import PostServices from 'Services/PostServices';
import PostTagServices from 'Services/PostTagServices';
import './Feed.css';
import Meta from 'antd/lib/card/Meta';
import { Post } from 'types/Post';
import { Category, PostTag } from 'types/PostTag';

import './Feed.css';
import CommentCollapse from 'Components/Comment/CommentCollapse';
import GamerAvatar from 'Components/GamerAvatar/GamerAvatar';
import { CheckOutlined, FormOutlined } from '@ant-design/icons';

function Feed() {
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
    console.log(values);
    PostServices.createPost(values).then(() => {
      PostServices.getPosts().then((posts) => {
        setPosts(posts.data);
      });
    });
    handleOk();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  function displayPosts() {
    const result: Array<JSX.Element> = [];
    const reversedPosts = [...posts].reverse();
    reversedPosts.forEach((post) => {
      const postTags = displayPostTags(post.tags);
      result.push(
        <Card
          className="post"
          bordered={false}
          key={post._id}
          title={
            <div className="title">
              <div className="writer">{post.writer.pseudo}</div>
              <div className="postTags">{postTags}</div>
            </div>
          }
        >
          <Meta
            avatar={<GamerAvatar avatarStyle="feedAvatar" gamer={post.writer} />}
            title={post.name}
            description={post.content}
          />
          <br />
          <CommentCollapse post={post} />
        </Card>
      );
    });
    return result;
  }

  function displayPostTags(postTags: PostTag[]) {
    const result: Array<JSX.Element> = [];
    postTags.sort(function (a, b) {
      if (a.category === b.category) {
        return a.name > b.name ? 1 : -1;
      }
      if (a.category === Category.Event) {
        return 1;
      }
      return -1;
    });
    postTags.forEach((postTag) => {
      result.push(
        <Tag className="postTag" key={postTag.name} color={postTag.category}>
          {postTag.name}
        </Tag>
      );
    });
    return result;
  }

  const options = postTags.map((postTag) => {
    return {
      value: postTag.name,
    };
  });

  function tagRender(props: any) {
    const { label, closable, onClose } = props;
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

  function handleFilter(value: string[]) {
    PostServices.filterPosts(value).then((posts) => {
      setPosts(posts.data);
    });
  }

  return (
    <>
      <br />
      <Row justify="space-around">
        <Col span={4}>
          <Affix offsetTop={40} className="affix">
            <h3>Filter</h3>
            <Select
              mode="multiple"
              allowClear
              showArrow
              onChange={handleFilter}
              tagRender={tagRender}
              style={{ width: '100%' }}
              options={options}
            />
          </Affix>
        </Col>

        <Col span={12}>
          <div id="posts">{displayPosts()}</div>
        </Col>

        <Col span={4}>
          <Affix offsetTop={40} className="affix">
            <h3>Share something</h3>
            <Button
              size="large"
              onClick={showModal}
              shape="round"
              icon={<FormOutlined />}
            >
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
              <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
                Create post
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
}

export default Feed;

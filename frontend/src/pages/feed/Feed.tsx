<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from 'react';
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
<<<<<<< HEAD

import PostServices from 'Services/PostServices';
import PostTagServices from 'Services/PostTagServices';
=======
import './Feed.css';
<<<<<<< HEAD
import GamerServices from '../../services/GamerServices';
import PostServices from '../../services/PostServices';
import PostTagServices from '../../services/PostTagServices';
>>>>>>> 05fd3a0 (Post, post tag back, feed updated)
=======
import GamerServices from '../../Services/GamerServices';
import PostServices from '../../Services/PostServices';
import PostTagServices from '../../Services/PostTagServices';
>>>>>>> 3cd3394 (Solved import issues)
>>>>>>> 09fa6fe (Solved import issues)
import Meta from 'antd/lib/card/Meta';
<<<<<<< HEAD
import { Post } from 'types/Post';
import { Category, PostTag } from 'types/PostTag';
=======
import { Post } from '../../types/Post';
import { PostTag } from '../../types/PostTag';
>>>>>>> 83e6ba3 (Solved import configs)
=======
=======
>>>>>>> c86750e (Post, post tag back, feed updated)
import { ChangeEvent, useEffect, useState } from 'react';
import { Affix, Button, Card, Modal, Form, Input, Row, Col, Avatar,Tag,Select } from 'antd';

import GamerServices from 'Services/GamerServices';
import PostServices from 'Services/PostServices';
import PostTagServices from 'Services/PostTagServices';
=======
import React, { ChangeEvent, useEffect, useState } from 'react';
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
import './Feed.css';
<<<<<<< HEAD
import GamerServices from '../../services/GamerServices';
import PostServices from '../../services/PostServices';
import PostTagServices from '../../services/PostTagServices';
>>>>>>> 05fd3a0 (Post, post tag back, feed updated)
=======
import GamerServices from '../../Services/GamerServices';
import PostServices from '../../Services/PostServices';
import PostTagServices from '../../Services/PostTagServices';
>>>>>>> 3cd3394 (Solved import issues)
import Meta from 'antd/lib/card/Meta';
import { Post } from 'types/Post';
import { PostTag } from 'types/PostTag';
>>>>>>> 91e3dc5 (follow + recherche user + description relié au back + refonte front)

import './Feed.css';

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
          title={
            <div className="title">
              <div className="writer">{post.writer.pseudo}</div>
              <div className="postTags">{postTags}</div>
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

<<<<<<< HEAD
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
        <Tag className="postTag" color={postTag.category}>
          {postTag.name}
        </Tag>
      );
    });
    return result;
  }

=======
>>>>>>> c86750e (Post, post tag back, feed updated)
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

<<<<<<< HEAD
  function handleFilter(value: string[]) {
    PostServices.filterPosts(value).then((posts) => {
      setPosts(posts.data);
    });
  }

=======
>>>>>>> c86750e (Post, post tag back, feed updated)
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

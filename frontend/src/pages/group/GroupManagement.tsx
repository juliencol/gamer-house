import { useState, useEffect, ChangeEvent } from 'react';
import { Group as IGroup } from 'types/Group';
import { Gamer as IGamer } from 'types/Gamer';
import { Modal, Form, Input, Button, Row, Col, Layout } from 'antd';
import { CheckOutlined, PlusOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import GroupServices from 'Services/GroupServices';
import Group from 'Components/Group/Group';
import './GroupManagement.css';

function GroupManagement() {
  const [groups, setGroups] = useState<Array<IGroup>>([]);
  const [myGroups, setMyGroups] = useState<Array<IGroup>>();

  const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false);
  const [isJoinGroupModalVisible, setIsJoinGroupModalVisible] = useState(false);

  const [groupToJoin, setGroupToJoin] = useState('');

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    GroupServices.getAllGroups().then((groups) => setGroups(groups.data));
  }, []);

  useEffect(() => {
    GroupServices.getGroups().then((res) => setMyGroups(res.data));
  }, [refresh]);

  function displaySelectJoinGroup() {
    return (
      <select
        name="groupId"
        className="form-control"
        onChange={handleSelectJoinGroup}
        style={{ textAlign: 'center' }}
      >
        <option hidden disabled selected>
          -- Select a group to join --
        </option>
        {groups?.map((group) => (
          <option key={group._id} value={group._id}>
            {group.name}
          </option>
        ))}
      </select>
    );
  }

  function handleSelectJoinGroup(e: ChangeEvent<HTMLSelectElement>) {
    const value: string = e.target.value;
    setGroupToJoin(value);
  }

  function handleOk() {
    setIsCreateGroupModalVisible(false);
    setIsJoinGroupModalVisible(false);
  }

  const onFinishCreateGroup = (value: { name: string }) => {
    GroupServices.createGroup(value).then(() => {
      GroupServices.getAllGroups().then((groups) => {
        setGroups(groups.data);
      });
    });
    handleOk();
  };

  function joinGroup() {
    GroupServices.joinGroup({ groupId: groupToJoin })
      .then(() => {
        setGroupToJoin('');
        setIsJoinGroupModalVisible(false);
        setRefresh(!refresh);
      })
      .catch(() => alert("Oups can't join this group..."));
  }

  return (
    <div className="groupPage">
      <Row style={{ marginTop: '20px' }}>
        <Button
          shape="round"
          onClick={() => setIsCreateGroupModalVisible(true)}
          icon={<PlusOutlined />}
          style={{ marginRight: '20px' }}
        >
          Create a group
        </Button>
        <Button
          shape="round"
          onClick={() => setIsJoinGroupModalVisible(true)}
          icon={<UsergroupAddOutlined />}
        >
          Join a group
        </Button>
      </Row>

      <Row className="mainRow2">
        <h1>My groups</h1>
        <div className="gridGroup">
          {myGroups?.map((group) => (
            <Col>
              <Group group={group} key={group._id} refresh={() => setRefresh(!refresh)} />
            </Col>
          ))}
        </div>
      </Row>

      <Modal
        title="Create a Group"
        visible={isCreateGroupModalVisible}
        onCancel={() => setIsCreateGroupModalVisible(false)}
        footer={[
          <Button onClick={() => setIsCreateGroupModalVisible(false)}>Cancel</Button>,
        ]}
      >
        <Form name="basic" onFinish={onFinishCreateGroup}>
          <Form.Item
            label="Group Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input the name of your group!',
              },
            ]}
          >
            <Input maxLength={20} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
              Create Group
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Join a Group"
        visible={isJoinGroupModalVisible}
        footer={[
          <Button onClick={() => setIsJoinGroupModalVisible(false)}>Cancel</Button>,
        ]}
      >
        {displaySelectJoinGroup()}
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => joinGroup()}
          icon={<CheckOutlined />}
        >
          Join Group
        </Button>
      </Modal>
    </div>
  );
}

export default GroupManagement;

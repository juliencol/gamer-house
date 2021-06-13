import { UsergroupDeleteOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
import GroupServices from 'Services/GroupServices';
import { Group as IGroup } from 'types/Group';
import './Group.css';

function Group(props: { group: IGroup; refresh: () => void }) {
  function leaveGroup() {
    GroupServices.leaveGroup(props.group._id)
      .then(() => props.refresh())
      .catch(() => alert("Can't leave this group..."));
  }

  return (
    <Card className="group" title={<h1>{props.group.name}</h1>}>
      <img
        src={props.group.banner}
        alt="There is no banner for the moment..."
        style={{ width: '100%' }}
      />
      <p>Number of members: {props.group.members.length}</p>
      <Button onClick={leaveGroup} icon={<UsergroupDeleteOutlined />} />
    </Card>
  );
}

export default Group;

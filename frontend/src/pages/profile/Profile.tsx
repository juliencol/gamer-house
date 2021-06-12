import './Profile.css';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
import {
  Layout,
  Modal,
  Button,
  Upload,
  Typography,
  Avatar,
  Carousel,
  Popconfirm,
  Input,
  Row,
<<<<<<< HEAD
<<<<<<< HEAD
  Col,
} from 'antd';
import {
  UploadOutlined,
  UserOutlined,
<<<<<<< HEAD
<<<<<<< HEAD
  CheckOutlined,
  PlusCircleTwoTone,
  DeleteOutlined,
} from '@ant-design/icons';
import GamerServices from 'Services/GamerServices';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { Gamer } from 'types/Gamer';
=======
import {Layout, Modal, Button, Upload, Typography, Avatar, Carousel, Popconfirm} from 'antd';
import { UploadOutlined,UserOutlined } from '@ant-design/icons';
=======
=======
  Col,
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
=======
  PlusCircleOutlined,
=======
>>>>>>> b359b63 (Added button Icons)
  CheckOutlined,
  PlusCircleTwoTone,
  DeleteOutlined,
} from '@ant-design/icons';
>>>>>>> a5aac7c (refonte front + feature followed)
import GamerServices from '../../Services/GamerServices';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { Gamer } from '../../types/Gamer';
>>>>>>> 2f3bf99 (Remove Games Button and Modal)

const { Header, Footer, Content } = Layout;

function Profile() {
  const [gamer, setGamer] = useState<Gamer>();
  const [gamersSearchResult, setGamersSearchResult] = useState<Array<Gamer>>();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
  const [idToUnfollow, setIdToUnfollow] = useState('');
  const { Paragraph } = Typography;
  const [isUnfollowModalVisible, setIsUnfollowModalVisible] = useState(false);
  const [isRGModalVisible, setIsRGModalVisible] = useState(false);
  const [popConfirm, setPopConfirmVisible] = useState(false);
  const [popUnfollowConfirm, setPopUnfollowConfirm] = useState(false);
  const [description, setDescription] = useState('');
  const [isFollowModalVisible, setIsFollowModalVisible] = useState(false);
  const { Search } = Input;
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  };
  const showRGModal = () => {
    setIsRGModalVisible(true);
  };

  const showPopConfim = () => {
    setPopConfirmVisible(true);
  };
  const handleOkRG = () => {
    setPopConfirmVisible(false);
    setTimeout(() => {
      setIsRGModalVisible(false);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b359b63 (Added button Icons)
    }, 200);
  };

  const handleCancelRG = () => {
    setPopConfirmVisible(false);
    setTimeout(() => {
      setIsRGModalVisible(false);
    }, 100);
<<<<<<< HEAD
=======
    }, 500);
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
=======
>>>>>>> b359b63 (Added button Icons)
  };

  const handleOkUnfollow = () => {
    setPopUnfollowConfirm(false);
    GamerServices.unfollowGamer(idToUnfollow).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data));
    });
    setTimeout(() => {
      setIsUnfollowModalVisible(false);
<<<<<<< HEAD
<<<<<<< HEAD
    }, 200);
=======
    }, 500);
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
=======
    }, 200);
>>>>>>> b359b63 (Added button Icons)
  };

  const handleCancelUnfollow = () => {
    setPopUnfollowConfirm(false);
    setTimeout(() => {
      setIsUnfollowModalVisible(false);
<<<<<<< HEAD
<<<<<<< HEAD
    }, 100);
  };

=======
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
=======
    }, 500);
  };

  const handleCancelRG = () => {
    setPopConfirmVisible(false);
    setTimeout(() => {
      setIsRGModalVisible(false);
    }, 500);
  };
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
=======
    }, 100);
  };

>>>>>>> b359b63 (Added button Icons)
  useEffect(() => {
    GamerServices.getAuthenticatedGamer().then((gamer) => {
      setGamer(gamer.data);
      setDescription(gamer.data.description);
    });
  }, []);

<<<<<<< HEAD
<<<<<<< HEAD
=======
  const { Search } = Input;

>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
=======
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
  function onSearch(value: string) {
    GamerServices.searchGamers(value).then((gamers) => {
      setGamersSearchResult(gamers.data);
      console.log(gamers.data);
    });
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
  function changeDescription(e: any) {
    GamerServices.updateGamer({ description: description }).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => {
        setGamer(gamer.data);
        setDescription(gamer.data.description);
      });
    });
  }

  function followGamer(gamerId: string) {
    GamerServices.followGamer({ idToFollow: gamerId }).then(() =>
      GamerServices.getAuthenticatedGamer().then((gamer) => setGamer(gamer.data))
    );
  }

<<<<<<< HEAD
  function displaySearchGamersResult() {
    return gamersSearchResult?.map((searchedGamer) => (
=======
  function displaySearchGamersResult() {
    console.log('Toto');
    return gamersSearchResult?.map((gamer) => (
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
=======
  function displaySearchGamersResult() {
    return gamersSearchResult?.map((searchedGamer) => (
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
      <Row>
        <img
          className="avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHQkNOzYqIg7yA0UfPI_ILNRbTvrgXflC6g&usqp=CAU"
          alt="avatar"
        />
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
        <div>
          <h1>{searchedGamer.pseudo}</h1>
          <strong>{searchedGamer.statusMessage}</strong>
          <br />
          <span>Number of followers: {searchedGamer.followers.length}</span>
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
        {createFollowButton(searchedGamer._id)}
      </Row>
    ));
  }

  function createFollowButton(id: string) {
    if (gamer?.following?.find((followedGamer) => followedGamer._id === id)) {
      return <Button disabled> Already Followed </Button>;
    }
<<<<<<< HEAD
    return <Button onClick={() => followGamer(id)}>Follow</Button>;
  }

  function displayFollowedGamers() {
    return gamer?.following?.map((followedGamer) => (
      <Row>
        <Col span={1}>
          <img
            className="avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHQkNOzYqIg7yA0UfPI_ILNRbTvrgXflC6g&usqp=CAU"
            alt="avatar"
          />
          <h1>{followedGamer.pseudo}</h1>
          <strong>{followedGamer.statusMessage}</strong>
        </Col>
=======
        <h1>{gamer.pseudo}</h1>
        <strong>{gamer.statusMessage}</strong>
        <br />
        <span>Number of followers: {gamer.followers.length}</span>
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
=======
        <Button onClick={() => followGamer(searchedGamer._id)}>Follow</Button>
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
=======
        {createFollowButton(searchedGamer._id)}
>>>>>>> a5aac7c (refonte front + feature followed)
      </Row>
    ));
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
  function createFollowButton(id: string) {
    if (gamer?.following?.find((followedGamer) => followedGamer._id === id)) {
      return <Button disabled> Already Followed </Button>;
    }
    return <Button onClick={() => followGamer(id)}>Follow</Button>;
  }

>>>>>>> a5aac7c (refonte front + feature followed)
  function displayFollowedGamers() {
    return gamer?.following?.map((followedGamer) => (
      <Row>
        <Col span={1}>
          <img
            className="avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHQkNOzYqIg7yA0UfPI_ILNRbTvrgXflC6g&usqp=CAU"
            alt="avatar"
          />
          <h1>{followedGamer.pseudo}</h1>
          <strong>{followedGamer.statusMessage}</strong>
        </Col>
      </Row>
    ));
  }

>>>>>>> 0c59915 (added follow feature, unfollow in progress)
  function displaySelectUnfollowGamer() {
    return (
      <select
        name="idToUnfollow"
        className="form-control"
        onChange={handleSelectUnfollowGamer}
<<<<<<< HEAD
<<<<<<< HEAD
        style={{ textAlign: 'center' }}
=======
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
=======
        style={{ textAlign: 'center' }}
>>>>>>> a5aac7c (refonte front + feature followed)
      >
        <option hidden disabled selected>
          {' '}
          -- Select a gamer to unfollow --{' '}
        </option>
        {gamer?.following?.map((followedGamer) => (
<<<<<<< HEAD
<<<<<<< HEAD
          <option value={followedGamer._id}>
            {followedGamer.pseudo} {followedGamer.statusMessage}
          </option>
=======
          <option value="">{followedGamer}</option>
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
=======
          <option value={followedGamer._id}>
            {followedGamer.pseudo} {followedGamer.statusMessage}
          </option>
>>>>>>> abc670d (Added Unfollow Feature)
        ))}
      </select>
    );
  }

  function handleSelectUnfollowGamer(e: ChangeEvent<HTMLSelectElement>) {
    const value: string = e.target.value;
    setIdToUnfollow(value);
  }

<<<<<<< HEAD
=======
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
=======
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
  const profilePicture = File;
  function onFileUpload(event: ChangeEvent<HTMLInputElement>) {}

  function createCarouselGame() {
    const result: Array<JSX.Element> = [];
    for (let i = 0; i < 3; i++) {
      result.push(
        <div className="CarouselImg">
          <h3>Carousel Photo</h3>
        </div>
      );
<<<<<<< HEAD
=======


    function createCarouselGame(){
      const result : Array<JSX.Element> = [];
      for(let i=0; i<3;i++){
        result.push(
          <div className="CarouselImg">
            <h3>Carousel Photo</h3>
          </div>
        )
      }
      return result;
    }
    

    const {Paragraph} = Typography;
    const [editableStr, setEditableStr] = useState('This is an editable text.');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRGModalVisible, setIsRGModalVisible] = useState(false);
    const [popConfirm, setPopConfirmVisible] = useState(false);
    const showRGModal = () => {
        setIsRGModalVisible(true);
    };

    const showPopConfim = () =>{
      setPopConfirmVisible(true);
    };
    const handleOkRG = () => {
        setPopConfirmVisible(false);
        setTimeout(() => {
          setIsRGModalVisible(false);
        }, 500);
        
    };
    
    const handleCancelRG = () => {
      setPopConfirmVisible(false);
        setTimeout(() => {
          setIsRGModalVisible(false);
        }, 500);
    };

    

    function getBase64(img:any, callback:any) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
>>>>>>> 250df06 (Added Carousel for Games Played)
=======
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
    }
    return result;
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
  const { Paragraph } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRGModalVisible, setIsRGModalVisible] = useState(false);
  const [popConfirm, setPopConfirmVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [isFollowModalVisible, setIsFollowModalVisible] = useState(false);
  const showRGModal = () => {
    setIsRGModalVisible(true);
  };

  const showPopConfim = () => {
    setPopConfirmVisible(true);
  };
  const handleOkRG = () => {
    setPopConfirmVisible(false);
    setTimeout(() => {
      setIsRGModalVisible(false);
    }, 500);
  };

  const handleCancelRG = () => {
    setPopConfirmVisible(false);
    setTimeout(() => {
      setIsRGModalVisible(false);
    }, 500);
  };

  function changeDescription(e: any) {
    GamerServices.updateGamer({ description: description }).then(() => {
      GamerServices.getAuthenticatedGamer().then((gamer) => {
        setGamer(gamer.data);
        setDescription(gamer.data.description);
      });
    });
  }

>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
=======
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  return (
    <Layout>
      <Content>
        <Row className="mainRow">
          <Col className="mainColumn" span={6}>
            <h1>Avatar</h1>
            <div>
              <Avatar size={64} icon={<UserOutlined />} />
=======
=======

>>>>>>> 2f3bf99 (Remove Games Button and Modal)
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },

        
         /* onChange(info:any) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            getBase64(info.file.originFileObj, imageUrl =>
              this.setState({
                imageUrl,
                loading: false,
              }),
            );
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }, */
      };

    return(
        <div className="Profile">
        <Layout>
            <Content><p>Profile</p>

            <div className="Content">

                <div className="LeftColumm">
                    <div className="Avatar">
                      <p>Avatar</p>
                      <div><Avatar size={64} icon={<UserOutlined />} /></div>
                      <Upload {...props}>
                          <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload>
                    </div>
                    <div className="RemoveGame">
                      <Button onClick={showRGModal}>RemoveGame</Button>
                      <Modal title="Remove Game Modal" visible={isRGModalVisible}
                      footer={[
                        <Popconfirm title="Are you sure to Remove these Games ?" 
                        okText="Yes" cancelText="No" visible={popConfirm} onConfirm={handleOkRG} onCancel={handleCancelRG}>
                        </Popconfirm>,
                        <Button danger key="remove" onClick={showPopConfim}>
                          Remove 
                        </Button>,
                        <Button key="cancel" onClick={handleCancelRG}>
                          Cancel 
                        </Button>
                        
                        
                      ]}>
                        
                      </Modal>
                    </div>
=======
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },

    /* onChange(info:any) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }, */
  };

=======
>>>>>>> 0c59915 (added follow feature, unfollow in progress)
  return (
<<<<<<< HEAD
    <div className="Profile">
      <Layout>
        <Content>
          <p>Profile</p>

          <div className="Content">
            <div className="FirstRow">
              <div className="Avatar">
                <p>Avatar</p>
                <div>
                  <Avatar size={64} icon={<UserOutlined />} />
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
                </div>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>
              <div className="Description">
                <h1 style={{ color: 'white' }}>Description</h1>
                <div className="DescriptionTextWrapper">
                  <Paragraph editable={{ onChange: setDescription }}>
                    {description}
                  </Paragraph>
                </div>
                <div>
                  <Button type="primary" size="small" onClick={changeDescription}>
                    Change description
                  </Button>
                </div>
              </div>

              <div className="Username">
                Username
                <p>{gamer?.pseudo}</p>
              </div>
=======
    <Layout>
      <Content>
        <Row className="mainRow">
          <Col className="mainColumn" span={6}>
            <h1>Avatar</h1>
            <div>
              <Avatar size={64} icon={<UserOutlined />} />
>>>>>>> a5aac7c (refonte front + feature followed)
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Col>
          <Col span={12} className="mainColumn">
            <h1>Description</h1>
            <div className="descriptionTextWrapper">
              <Paragraph editable={{ onChange: setDescription }}>{description}</Paragraph>
            </div>
            <div>
              <Button
                shape="round"
                type="primary"
                size="small"
                onClick={changeDescription}
              >
                Change description
              </Button>
            </div>
          </Col>
          <Col span={6} className="mainColumn">
            <h1>Username</h1>
            <p>{gamer?.pseudo}</p>
          </Col>
        </Row>

<<<<<<< HEAD
            <div className="SecondRow">
              <div className="RemoveGame">
                <Button onClick={showRGModal}>RemoveGame</Button>
                <Modal
                  title="Remove Game Modal"
                  visible={isRGModalVisible}
                  footer={[
                    <Popconfirm
                      title="Are you sure to Remove these Games ?"
                      okText="Yes"
                      cancelText="No"
                      visible={popConfirm}
                      onConfirm={handleOkRG}
                      onCancel={handleCancelRG}
                    ></Popconfirm>,
                    <Button danger key="remove" onClick={showPopConfim}>
                      Remove
                    </Button>,
                    <Button key="cancel" onClick={handleCancelRG}>
                      Cancel
                    </Button>,
                  ]}
                ></Modal>
              </div>

              <div className="GamePlayed">
                I Play the Following games
                <div className="Button-wrapper">
                  <Button type="dashed" size="large" onClick={showRGModal}>
                    Add Games
                  </Button>
                </div>
<<<<<<< HEAD
                    
>>>>>>> 250df06 (Added Carousel for Games Played)
=======
              </div>
              <div className="AddGame">Add Game +</div>
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Col>
          <Col span={12} className="mainColumn">
            <h1>Description</h1>
            <div className="descriptionTextWrapper">
              <Paragraph editable={{ onChange: setDescription }}>{description}</Paragraph>
            </div>
            <div>
              <Button
                shape="round"
                type="primary"
                size="small"
                onClick={changeDescription}
              >
                Change description
              </Button>
            </div>
          </Col>
          <Col span={6} className="mainColumn">
            <h1>Username</h1>
            <p>{gamer?.pseudo}</p>
          </Col>
        </Row>

<<<<<<< HEAD
        <Row className="mainRow">
          <Col span={6} className="mainColumn">
            <h1>Remove a game</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                type="default"
                size="large"
                icon={<DeleteOutlined />}
                onClick={showRGModal}
              >
                Remove
              </Button>
            </div>
            <Modal
              title="Remove Game Modal"
              visible={isRGModalVisible}
              footer={[
                <Popconfirm
                  title="Are you sure to Remove these Games ?"
                  okText="Yes"
                  cancelText="No"
                  visible={popConfirm}
                  onConfirm={handleOkRG}
                  onCancel={handleCancelRG}
                ></Popconfirm>,
                <Button key="cancel" onClick={handleCancelRG}>
                  Cancel
                </Button>,
                <Button danger key="remove" onClick={showPopConfim}>
                  Remove
                </Button>,
              ]}
            ></Modal>
          </Col>

=======
        <Row className="mainRow">
          <Col span={6} className="mainColumn">
            <h1>Remove a game</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                type="default"
                size="large"
                icon={<DeleteOutlined />}
                onClick={showRGModal}
              >
                Remove
              </Button>
            </div>
            <Modal
              title="Remove Game Modal"
              visible={isRGModalVisible}
              footer={[
                <Popconfirm
                  title="Are you sure to Remove these Games ?"
                  okText="Yes"
                  cancelText="No"
                  visible={popConfirm}
                  onConfirm={handleOkRG}
                  onCancel={handleCancelRG}
                ></Popconfirm>,
                <Button key="cancel" onClick={handleCancelRG}>
                  Cancel
                </Button>,
                <Button danger key="remove" onClick={showPopConfim}>
                  Remove
                </Button>,
              ]}
            ></Modal>
          </Col>

>>>>>>> a5aac7c (refonte front + feature followed)
          <Col span={12} className="mainColumn">
            <h1>I play the following games</h1>
          </Col>
          <Col span={6} className="mainColumn">
            <h1>Add a game</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
<<<<<<< HEAD
<<<<<<< HEAD
                type="default"
=======
                type="dashed"
>>>>>>> a5aac7c (refonte front + feature followed)
=======
                type="default"
>>>>>>> b359b63 (Added button Icons)
                size="large"
                onClick={showRGModal}
                icon={<PlusCircleTwoTone twoToneColor="#6f4071" />}
              >
                Add
              </Button>
<<<<<<< HEAD
            </div>
          </Col>
        </Row>

        <Row className="mainRow">
          <Col span={6} className="mainColumn">
            <h1>Unfollow a gamer</h1>
            <div className="ButtonWrapper">
              <Button shape="round" onClick={() => setIsUnfollowModalVisible(true)}>
                Unfollow -
              </Button>
            </div>
            <Modal
              title="Unfollow"
              visible={isUnfollowModalVisible}
              footer={[
                <Popconfirm
                  title="Are you sure you want to unfollow this gamer?"
                  okText="Yes"
                  cancelText="No"
                  visible={popUnfollowConfirm}
                  onConfirm={handleOkUnfollow}
                  onCancel={handleCancelUnfollow}
                ></Popconfirm>,
                <Button key="cancel" onClick={() => setIsUnfollowModalVisible(false)}>
                  Cancel
                </Button>,
                <Button
                  danger
                  key="remove"
                  onClick={() => setPopUnfollowConfirm(true)}
                  icon={<CheckOutlined />}
                >
                  Remove
                </Button>,
              ]}
            >
              {displaySelectUnfollowGamer()}
            </Modal>
          </Col>
          <Col span={12} className="mainColumn">
            <h1>I Follow</h1>
            {displayFollowedGamers()}
          </Col>
          <Col span={6} className="mainColumn">
            <h1>Follow a gamer</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                onClick={() => setIsFollowModalVisible(true)}
                size="large"
                icon={<PlusCircleTwoTone twoToneColor="#6f4071" />}
              >
                Follow +
              </Button>
            </div>
            <Modal
              title="Follow a gamer"
              visible={isFollowModalVisible}
              onOk={() => setIsFollowModalVisible(false)}
              onCancel={() => setIsFollowModalVisible(false)}
            >
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{ width: 200 }}
              />
              {displaySearchGamersResult()}
            </Modal>
          </Col>
        </Row>
      </Content>
    </Layout>
=======
            <div className="ThirdRow">
              <div className="Event">
                Upcoming events
                <div className="CarouselContainer">
                  <Carousel effect="scrollx">{createCarouselGame()}</Carousel>
                </div>
              </div>
=======
>>>>>>> a5aac7c (refonte front + feature followed)
            </div>
          </Col>
        </Row>

        <Row className="mainRow">
          <Col span={6} className="mainColumn">
            <h1>Unfollow a gamer</h1>
            <div className="ButtonWrapper">
              <Button shape="round" onClick={() => setIsUnfollowModalVisible(true)}>
                Unfollow -
              </Button>
            </div>
            <Modal
              title="Unfollow"
              visible={isUnfollowModalVisible}
              footer={[
                <Popconfirm
                  title="Are you sure you want to unfollow this gamer?"
                  okText="Yes"
                  cancelText="No"
                  visible={popUnfollowConfirm}
                  onConfirm={handleOkUnfollow}
                  onCancel={handleCancelUnfollow}
                ></Popconfirm>,
                <Button key="cancel" onClick={() => setIsUnfollowModalVisible(false)}>
                  Cancel
                </Button>,
                <Button
                  danger
                  key="remove"
                  onClick={() => setPopUnfollowConfirm(true)}
                  icon={<CheckOutlined />}
                >
                  Remove
                </Button>,
              ]}
            >
              {displaySelectUnfollowGamer()}
            </Modal>
          </Col>
          <Col span={12} className="mainColumn">
            <h1>I Follow</h1>
            {displayFollowedGamers()}
          </Col>
          <Col span={6} className="mainColumn">
            <h1>Follow a gamer</h1>
            <div className="ButtonWrapper">
              <Button
                shape="round"
                onClick={() => setIsFollowModalVisible(true)}
                size="large"
                icon={<PlusCircleTwoTone twoToneColor="#6f4071" />}
              >
                Follow +
              </Button>
            </div>
<<<<<<< HEAD
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
=======
            <Modal
              title="Follow a gamer"
              visible={isFollowModalVisible}
              onOk={() => setIsFollowModalVisible(false)}
              onCancel={() => setIsFollowModalVisible(false)}
            >
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{ width: 200 }}
              />
              {displaySearchGamersResult()}
            </Modal>
          </Col>
        </Row>
      </Content>
    </Layout>
>>>>>>> a5aac7c (refonte front + feature followed)
  );
}
export default Profile;

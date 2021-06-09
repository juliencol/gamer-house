import './Profile.css';
import {Layout, Modal, Button, Upload, message, Avatar} from 'antd';
import { UploadOutlined,UserOutlined } from '@ant-design/icons';
import GamerServices from '../../Services/GamerServices';
import { ChangeEvent, useEffect, useState } from 'react';
import { Gamer } from '../../types/Gamer';

const { Header, Footer, Content } = Layout;


function Profile(){
    const [gamer,setGamer] = useState<Gamer>();
    useEffect(()=>{ 
      GamerServices.getAuthenticatedGamer().then((gamer)=>{
          setGamer(gamer.data);
      })
     },[]);

    const profilePicture = File;
    function onFileUpload(event : ChangeEvent<HTMLInputElement>){
        
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
      };
    
    const handleCancel = () => {
    setIsModalVisible(false);
    };

    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }

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
                    <div className="RemoveGame">RemoveGame</div>
                </div>

                <div className="MainColumm">
                    <div className="MainContent"><p>Main Content</p>

                        <div className = "Description">Description 
                          <div className="Button-wrapper">
                            <Button type="dashed" size ="large" onClick={showModal}>
                              Add Description
                            </Button>
                          </div>
                        
                        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <form action=""></form>
                        </Modal>
                        </div>
                        
                        <div className = "GamePlayed">I Play the Following games
                        <div className="Button-wrapper">
                            <Button type="dashed" size ="large" onClick={showModal}>
                              Add Games
                            </Button>
                            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <form action=""></form>
                            </Modal>
                          </div>
                        </div>

                        <div className = "Event">Upcoming events
                        <button>Add Events</button>
                        </div>
                        
                        <div className = "Follow">I Follow</div>
                </div>
                    
                </div>

                <div className="RightColumm">
                    <div className="UserName">Username
                    <p>{gamer?.pseudo}</p>
                    </div>
                    <div className="AddFollow">Follow</div>
                    <div className="AddGame">AddGame</div>
                </div>
                    
            </div>

            </Content>
            <Footer>Footer</Footer>
        </Layout>
        </div>
    );
}
export default Profile;
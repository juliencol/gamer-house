import './Profil.css';
import {Layout, Modal, Button, Upload, message, Avatar} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';
const { Header, Footer, Content } = Layout;


function Profile(){
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

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

    return(
        <div className="Profile">
        <Layout>
            <Header>header</Header>
            <Content><p>Profile</p>

            <div className="Content">

                <div className="LeftColumm">
                    <div className="Avatar">
                    <div className="profilAvatar"><img src="" alt="" /></div>
                    <p>Avatar</p>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
                    <div className="RemoveGame">RemoveGame</div>
                </div>

                <div className="MainColumm">
                    <div className="MainContent"><p>Main Content</p>

                        <div className = "Description">Description
                        <Button type="dashed" onClick={showModal}>
                            Open Modal
                        </Button>
                        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <form action=""></form>
                        </Modal>
                        </div>
                        
                        <div className = "GamePlayed">I Play the Following games
                        <button>Add Games</button>
                        </div>

                        <div className = "Event">Upcoming events
                        <button>Add Events</button>
                        </div>
                        
                        <div className = "Follow">I Follow</div>
                </div>
                    
                </div>

                <div className="RightColumm">
                    <div className="UserName">Username</div>
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
export default Profile
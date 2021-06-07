import './Profil.css';
import {Layout, Modal, Button} from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
const { Header, Footer, Sider, Content } = Layout;


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
                    <label htmlFor="files" className="btn">Change Avatar</label>
                    <input id="files" type="file"/>
                </div>
                    <div className="RemoveGame">RemoveGame</div>
                </div>

                <div className="MainColumm">
                    <div className="MainContent"><p>Main Content</p>

                        <div className = "Description">Description
                        <Button type="primary" onClick={showModal}>
                            Open Modal
                        </Button>
                        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
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
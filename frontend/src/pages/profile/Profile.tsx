import './Profile.css';
import {Layout, Modal, Button, Upload, Typography, Avatar, Carousel, Popconfirm} from 'antd';
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
                </div>

                <div className="MainColumm">
                    <div className="MainContent">
                        <div className = "Description">Description 
                          <div className="DescriptionTextWrapper">
                            <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph>
                          </div>
                        </div>
                        
                        <div className = "GamePlayed">I Play the Following games
                          <div className="Button-wrapper">
                            <Button type="dashed" size ="large" onClick={showRGModal}>
                              Add Games
                            </Button>
                
                          </div>
                        </div>

                        <div className = "Event">Upcoming events
                          <Carousel effect="scrollx">
                            {createCarouselGame()}
                          </Carousel>
                        </div>
                        
                        <div className = "Follow">I Follow</div>
                </div>
                    
                </div>

                <div className="RightColumm">
                    <div className="UserName">Username
                    <p>{gamer?.pseudo}</p>
                    </div>
                    <div className="AddGame">Add Game +</div>
                    <div className="AddFollow">Follow +</div>
                </div>
                    
            </div>

            </Content>
            <Footer>Footer</Footer>
        </Layout>
        </div>
    );
}
export default Profile;
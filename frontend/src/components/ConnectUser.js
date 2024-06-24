import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from 'antd';

const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  
const confirmStyle = {
    width: '50%',
    textAlign: 'center',
  };

const selectedCard = {
    width: '25%',
    textAlign: 'center',
    border: '1px solid black'
  };

const ConnectUser = ({list, closeForm}) => {
    const [firstUser, setFirstUser] = useState(null);
    const [secondUser, setSecondUser] = useState(null);
    useEffect(() => {
        if(firstUser && secondUser) {
            document.getElementById("confirmConnection").scrollIntoView({behavior: 'smooth'});
        }
    }, [firstUser, secondUser]);

    const confirmConnection = (firstUser, secondUser) => {
        axios.put(`http://localhost:5000/users/${firstUser}/${secondUser}`)
            .then(response => {
                closeForm();
            })
            .catch(error => {
                console.error(error);
            })
    };

    return (
        <div>
            <Card title="Select first user to connect">
                {list.map((e, idx) => (
                    <Card.Grid 
                        onClick={() => setFirstUser(e)}
                        key={idx} 
                        style={firstUser === e ? selectedCard : gridStyle}>
                            {e.name}
                    </Card.Grid>
                ))}
            </Card>
            
            {
                firstUser &&
                <Card title="Select second user to connect">
                    {list.map((e, idx) => (
                        firstUser !== e &&
                        <Card.Grid 
                            onClick={() => setSecondUser(e)}
                            key={idx} 
                            style={secondUser === e ? selectedCard : gridStyle}>
                                {e.name}
                        </Card.Grid>
                    ))}
                </Card>
            }

            {
                firstUser && secondUser && 
                <div id="confirmConnection">
                    <Card title="Connect these users?">
                        <Card.Grid 
                            style={confirmStyle}>
                                {firstUser.name}
                        </Card.Grid>
                        <Card.Grid 
                            style={confirmStyle}>
                                {secondUser.name}
                        </Card.Grid>
                    </Card>
                    <Button onClick={() => confirmConnection(firstUser._id, secondUser._id)} style={{marginTop: '20px'}} type="primary">Confirm</Button>
                </div>
            }
        </div>
    )
}

export default ConnectUser;
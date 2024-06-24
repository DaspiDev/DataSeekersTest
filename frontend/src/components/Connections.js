import React, { useState } from "react";
import { Card } from "antd";


const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

const selectedCard = {
    width: '25%',
    textAlign: 'center',
    border: '1px solid black'
  };

const Connections = ({list}) => {
    const [selectedUser, setSelectedUser] = useState(null);
    return (
        <div>
            <Card title="Select user to consult their connections">
                {list.map((e, idx) => (
                    <Card.Grid 
                        onClick={() => setSelectedUser(e)}
                        key={idx} 
                        style={selectedUser === e ? selectedCard : gridStyle}>
                            {e.name}
                    </Card.Grid>
                ))}
            </Card>

            {
                selectedUser && 
                <Card title="The selected user is connected to these users">
                    {list.map((e, idx) => (
                        selectedUser.connections.includes(e._id) &&
                        <Card.Grid 
                            hoverable={false}
                            key={idx} 
                            style={gridStyle}>
                                {e.name}
                        </Card.Grid>
                    ))}
                </Card>
            }
        </div>
    )
}

export default Connections;
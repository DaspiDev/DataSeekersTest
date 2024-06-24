import React from "react";
import { Card, Flex  } from 'antd';

const Users = ({list, connectUser, setConnectingUser}) => {
    const selectUser = (e) => {
        setConnectingUser(e);
        connectUser()
    }
    return (
        <Flex gap="middle" wrap justify="flex-start">
            {list.map((e, idx) => (
                <Card
                    title={e.name}
                    key={idx}
                    onClick={() => selectUser(e)}
                    style={{
                    width: 300,
                    margin: '10px',
                    textAlign: 'left',
                    cursor: 'pointer'
                }}>
                    <p>Age: {e.age}</p>
                    <p>E-mail: {e.email}</p>
                </Card>
            ))
            }
        </Flex>
    )
}

export default Users;
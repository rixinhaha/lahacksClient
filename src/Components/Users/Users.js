import React from 'react';
import './Users.css';

const Users = (props) => (
    <div className="roomInfo">
        <div className="roomHeader">
            <h4 className="userTracker">users online</h4>
        </div>
        <div className="userWrapper">
            {console.log(props.users)}
            {props.users.map((user,i)=>(
                <p className="user">{user.userid}</p>
            ))}
        </div>
    </div>
)

export default Users;
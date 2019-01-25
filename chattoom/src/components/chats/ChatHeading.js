import React from 'react';
import FAVideo from 'react-icons/lib/fa/video-camera'
import FAUserPlus from 'react-icons/lib/fa/user-plus'
import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control'

export default function({name, numberOfUsers}) {
	
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name" style={{color: 'black'}}>{name}</div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers ? numberOfUsers : null}</span>
				</div>
			</div>
			<div className="options">
				<FAVideo style={{color: 'black'}}/>
				<FAUserPlus style={{color: 'black'}}/>
				<MdEllipsisMenu style={{color: 'black'}}/>
			</div>
		</div>
	);
	
}

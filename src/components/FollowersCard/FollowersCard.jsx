import React from "react";
import "./FollowersCard.css";

const FollowersCard = () => {
	return (
		<div className="FlowersCard">
			<h3>Who is following you</h3>
			return (
			<div className="follower">
				<div>
					<img
						src="https://images.pexels.com/photos/13344483/pexels-photo-13344483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
						alt="follower"
						className="followerImage"
					/>
					<div className="name">
						<span>Lakshi</span>
						<span>@hey</span>
					</div>
					<button className="button fc-button">Follow</button>
				</div>
			</div>
			);
		</div>
	);
};

export default FollowersCard;

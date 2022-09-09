import React from "react";
import "./ProfileCard.css";
import Cover from "../../assets/cover.jpg";
import Profile from "../../assets/profileImg.jpg";

const ProfileCard = () => {
	const ProfilePage = true;
	return (
		<div className="ProfileCard">
			<div className="ProfileImages">
				<img src={Cover} alt="CoverImage" />
				<img src={Profile} alt="ProfileImage" />
			</div>
			<div className="ProfileName">
				<span>Lakshika De Zoysa</span>
				<span>Senior Software Engineer</span>
			</div>

			<div className="followStatus">
				<hr />
				<div>
					<div className="follow">
						<span>1.8M</span>
						<span>Followers</span>
					</div>

					<div className="vl"></div>
					<div className="follow">
						<span>200</span>
						<span>Following</span>
					</div>

					{ProfilePage && (
						<>
							<div className="vl"></div>
							<div className="follow">
								<span>3</span>
								<span>Posts</span>
							</div>
						</>
					)}
				</div>
				<hr />
			</div>
			{ProfilePage ? "" : <span>My Profile</span>}
		</div>
	);
};

export default ProfileCard;

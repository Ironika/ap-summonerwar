import React from 'react';
import ProfileData from 'components/profile/ProfileData';
import './Profile.scss';

/* This class was auto-generated by the JavaScriptWriter */
class Profile extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		ProfileData.register(this)
	}

	componentWillUnmount() {
		ProfileData.unregister()
	}

	render() {
		return (
			<div className='ap-profile'>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="sm-profile-user">
							<img alt="Summoners War" className="sm-profile-img" src="assets/images/monsters/King Angelmon.jpg"/>
							<div className="sm-sheet sm-sheet-profil-top">
								<div className="row">
									<div className="col-xs-12">
										<ul className="sm-profil-user-key">
											<li>Pseudo : <input className="sm-input" type="text" value={this.state.user.name} onChange={this.state.onChange.bind(this, 'name')}/></li>
											<li>Mail : <input className="sm-input" type="text" value={this.state.user.mail} onChange={this.state.onChange.bind(this, 'mail')}/></li>
											<li>Last import : <input className="sm-input" value="13/06/2017" disabled={true}/></li>
										</ul>
									</div>
									<div className="col-xs-12">
										<div className="sm-profl-user-update">
											<button className="sm-button" onClick={this.state.onClick.bind(this)}>Update</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="sm-sheet">
							<div className="sm-profil-stat">
								<img alt="Summoners War" src="assets/images/runes.png"/>
								<p>Monsters : <span>{this.state.monsters}</span></p>
							</div>
						</div>
						<div className="sm-sheet sm-sheet-profil-mid">
							<div className="sm-profil-stat">
								<img alt="Summoners War" src="assets/images/runes.png"/>
								<p>Runes : <span>{this.state.runes}</span></p>
							</div>
						</div>
						<div className="sm-sheet sm-sheet-profil-mid">
							<div className="sm-profil-stat">
								<img alt="Summoners War" src="assets/images/runes.png"/>
								<p>Builds : <span>{this.state.builds}</span></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default Profile;

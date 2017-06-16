import React from 'react';
import AppData from 'components/AppData';
import AppHelper from 'helpers/AppHelper';
import { browserHistory } from 'react-router';

import './App.scss';

/* This class was auto-generated by the JavaScriptWriter */
class App extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		AppData.register(this)
		AppHelper.register('/path', this, this.onAppStorePathUpdate.bind(this));
	}

	componentWillUnmount() {
		AppData.unregister()
	}

	onAppStorePathUpdate() {
		let path = AppHelper.getData('/path')
		if (path && browserHistory.getCurrentLocation().pathname !== path) {
			if (path === '___BACK___') {
				browserHistory.goBack()
				setTimeout(function () {
					AppHelper.navigate(browserHistory.getCurrentLocation().pathname)
				}, 0)
			} else {
				this.context.router.push(path);
			}
		}
	}

	render() {
		return (
			<div className='ap-app'>

				<nav className="sm-sidebar">
					<div className="sm-sidebar-logo-content">
						<a onClick={this.state.home}>
							<img alt="Summoners War" className="sm-sidebar-logo" src="assets/images/logo.png"/>
						</a>
					</div>
		    		<div className="sm-sidebar-profile">
		    			<a onClick={this.state.profile}>
		    				<img alt="Summoners War" className="sm-sidebar-profile-img" src="assets/images/monsters/homunculus.jpg"/>
		    				Homunculus
		    			</a>
		    		</div>
					<ul>
						<li><a onClick={this.state.import}>Import</a></li>
				        <li><a onClick={this.state.monsters}>Monsters</a></li>
				        <li><a onClick={this.state.runes}>Runes</a></li>
				        <li><a onClick={this.state.builds}>Builds</a></li>
			      	</ul>
				</nav>

				<header></header>
				<section className={"sm-section"}>
					<div className={"container sm-container"}>
						{this.props.children}
					</div>
				</section>
				<footer>
					<div className={"sm-footer"}>
					  	<p className={"sm-copyright"}>Copyright @ 2017 Com2Us. This is a fan site, we are not affiliated with Com2Us.</p>
					</div>
				</footer>
			</div>
		);
	}
}
App.contextTypes = { router: React.PropTypes.object };
export default App;

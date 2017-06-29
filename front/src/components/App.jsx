import React from 'react';
import AppData from 'components/AppData';
import AppHelper from 'helpers/AppHelper';
import { browserHistory } from 'react-router';
import { Utils, BusyBars } from 'ap-react-bootstrap'


import './App.scss';

/* This class was auto-generated by the JavaScriptWriter */
class App extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		AppData.register(this)
		AppHelper.register('/path', this, this.onAppStorePathUpdate.bind(this));
		AppHelper.register('/app/busy', this, this.onAppBusy.bind(this));
	}

	componentWillUnmount() {
		AppData.unregister()
		AppHelper.unregister(this)
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

	onAppBusy() {
		let busy = AppHelper.getData('/app/busy')
		clearTimeout(this._busyTimeout)
		if (busy) {
			this.setState({ busy: true })
		} else {
			this._busyTimeout = setTimeout(this.setState.bind(this, { busy: false }), 1000)
		}
	}

	buildPage(page, key) {
		return (
			<li key={key} className={(key == 'monsters' | key == 'runes' && !this.state.isLogged) ? " hidePage" : ""}><a onClick={this[page].bind(this)} className={(key == this.state.activePage) ? "activePage" : ""}>{key}</a></li>
		)
	}

	render() {
		return (
			<div className='ap-app'>

				<nav className="sm-sidebar">
					<div className="sm-sidebar-logo-content">
						<a onClick={this.onClickHome}>
							<img alt="Summoners War" className="sm-sidebar-logo" src="assets/images/logo.png"/>
						</a>
					</div>
		    		<div className="sm-sidebar-profile">
		    			<a onClick={this.onClickProfile}>
		    				<img alt="Summoners War" className="sm-sidebar-profile-img" src={this.state.profileImage}/>
		    				{this.state.username}
		    			</a>
		    		</div>
					<ul>
						{Utils.map(AppData.PAGES, this.buildPage.bind(this))}
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

				{this.state.busy ?
					<div className='sm-busy'>
						<BusyBars className='sm-busy-indicator'/>
					</div>
				: '' }
			</div>
		);
	}
}
App.contextTypes = { router: React.PropTypes.object };
export default App;

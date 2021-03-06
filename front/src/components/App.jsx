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
			this._busyTimeout = setTimeout(this.setState.bind(this, { busy: false }), 100)
		}
	}

	buildPage(page, key) {
		return (
			<li key={key} className={(!this.state.isLogged) ? " sm-hide" : ""}><a onClick={this[page].bind(this)} className={(key == this.state.activePage) ? "activePage" : ""}>{key}</a></li>
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
			      	<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="sm-form-paypal">
						<input type="hidden" name="cmd" value="_s-xclick"/>
						<input type="hidden" name="hosted_button_id" value="N2LQ9Q723DR9S"/>
						<input type="image" className="sm-paypal" src="assets/images/paypal.png" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
						<img alt=""src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"/>
					</form>
				</nav>

				<nav className={"sm-sidebar-mobile " + (this.state.showMobileMenu ? "" : "sm-hide")}>
		    		<div className="sm-sidebar-profile">
		    			<a onClick={this.onClickProfile}>
		    				<img alt="Summoners War" className="sm-sidebar-profile-img" src={this.state.profileImage}/>
		    				{this.state.username}
		    			</a>
		    		</div>
					<ul>
						{Utils.map(AppData.PAGES, this.buildPage.bind(this))}
			      	</ul>
			      	<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="sm-form-paypal">
						<input type="hidden" name="cmd" value="_s-xclick"/>
						<input type="hidden" name="hosted_button_id" value="N2LQ9Q723DR9S"/>
						<input type="image" className="sm-paypal" src="assets/images/paypal.png" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
						<img alt=""src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"/>
					</form>
				</nav>

				<section className={"sm-section"}>
					<header>
						<img alt="Summoners War" src="assets/images/logo.png" onClick={this.onClickHome}/>
						<i className="glyphicon glyphicon-menu-hamburger" onClick={this.onClickShowMobileMenu.bind(this)}></i>
					</header>
					<div className={"container sm-container"}>
						{this.props.children}
					</div>
					<footer>
						<div className={"sm-footer"}>
						  	<p className={"sm-copyright"}>
						  		Ankema @ 2017 Com2Us. This is a fan site, we are not affiliated with Com2Us.
						  	</p>
						</div>
					</footer>
				</section>

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

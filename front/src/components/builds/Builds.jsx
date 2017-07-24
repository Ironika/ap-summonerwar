import React from 'react'
import BuildsData from 'components/builds/BuildsData'
import BuildProfil from 'components-lib/buildProfil/BuildProfil'
import BuildsList from 'components-lib/buildsList/BuildsList'
import BuildInfos from 'components-lib/buildInfos/BuildInfos'

import './Builds.scss';

/* This class was auto-generated by the JavaScriptWriter */
class Builds extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		BuildsData.register(this)
	}

	componentWillUnmount() {
		BuildsData.unregister()
	}

	render() {
		return (
			<div className='sm-builds'>
				<div className={"row " + (this.state.isExpanded ? "sm-max-height" : "sm-builds-height")}>
					<div className={(this.state.isExpanded ? "col-xs-12 sm-builds-lists sm-hide" : "col-xs-12 sm-builds-lists")}>
						 <BuildsList/>
					</div>
					<div className={(this.state.isExpanded ? "col-xs-12 sm-max-height" : "col-xs-12 sm-builds-profil")}>
						<BuildProfil />
					</div>
					<div className={(this.state.isExpanded ? "col-xs-12 sm-hide" : "col-xs-12")}>
						<BuildInfos/>
					</div>
				</div>
			</div>
		);
	}

}
export default Builds;

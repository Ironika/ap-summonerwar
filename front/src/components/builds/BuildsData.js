import AppHelper from 'helpers/AppHelper';
import AuthHelper from 'helpers/AuthHelper';
import BuildHelper from 'helpers/BuildHelper';
import {Utils, BaseData}  from 'ap-react-bootstrap'


/* This class was auto-generated by the JavaScriptWriter */
class BuildsData extends BaseData {

	register(obj) {
		if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }
		super.register(obj)

		this.obj.state = {
            builds: []
        }

        this.buildDataBuilds()
	}

	unregister() {
	}

	buildDataBuilds() {
        let builds = Utils.map(BuildHelper.getData())
        this.setState({builds: builds})
    }

}
var BuildsObj = new BuildsData();
export default BuildsObj;

package org.ap.summonerwar.constants;

/* This class was auto-generated by the JavaWriter */
public enum EBuildState {

	_SAVE ("Save"),
	_IN_BUILDING ("InBuilding"),
	_BUILD ("Build"),
	;

	private String _name;

	private  EBuildState(String name) {
		_name = name;
	}

	public String getName() {
		return _name;
	}

	public static EBuildState getByName(String name) {
		for (EBuildState value: EBuildState.values()) {
			if (value.getName().equals(name)) {
				return value;
			}
		}
		return null;
	}

}

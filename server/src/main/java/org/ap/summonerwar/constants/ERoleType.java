package org.ap.summonerwar.constants;

/* This class was auto-generated by the JavaWriter */
public enum ERoleType {

	_ATTACK ("Attack"),
	_DEFENSE ("Defense"),
	_SUPPORT ("Support"),
	_MATERIAL ("Material"),
	_HP ("Hp"),
	;

	private String _name;

	private  ERoleType(String name) {
		_name = name;
	}

	public String getName() {
		return _name;
	}

	public static ERoleType getByName(String name) {
		for (ERoleType value: ERoleType.values()) {
			if (value.getName().equals(name)) {
				return value;
			}
		}
		return null;
	}

}
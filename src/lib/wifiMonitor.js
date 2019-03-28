import MapManager from './mapManager';

export default class WifiMonitor {
	
	constructor() {
		this.autoNavigation = false; //Updates canvas
		this.mapManager = new MapManager();
	}

	startScan() {
		let timers = {
			0: () => '00:00:00:00:00:00',
			1000: () => '00:00:00:00:00:01',
			2000: () => '00:00:00:00:00:02',
		}

		//this.mapManager.findPath()
	}
}
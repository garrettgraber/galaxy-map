
export const coordinateArray = [
	{
		name: "Coruscant",
		coordinates: "L-9",
		x: 0,
		y: 0,
		sectorCoordinates: {
			x: 0,
			y: 0
		}
	},
	{
		name: "Caamas",
		coordinates: "M-9",
		x: 14, // 1705.44
		y: 1, // 106.3
		sectorCoordinates : {
			x: 2,
			y: 1
		}
	},
	{
		name: "Byss",
		coordinates: "K-11",
		x: -6, // -721.1
		y: -22, //-2731.02
		sectorCoordinates: {
			x: 6,
			y: 2
		}
	},
	{
		name: "Galactic Center",
		coordinates: "L-11",
		x: 0, // 
		y: -18, // -2131.37
		sectorCoordinates: {
			x: 0,
			y: 8
		}
	},
	{
		name: "Bespin",
		coordinates: "K-18",
		x: -11, // -1429.96
		y: -102, //-12747.85
		sectorCoordinates: {
			x: 1,
			y: 6
		}
	},
	{
		name: "Ossus",
		coordinates: "R-6",
		x: 83, // 10492.62
		y: 38, // 4785.04
		sectorCoordinates: {
			x: 11,
			y: 2
		}
	},
	{
		name: "Tatooine",
		coordinates: "R-16",
		x: 76, // 9665.78
		y: -81, // -10099.11
		sectorCoordinates: {
			x: 4,
			y: 3
		}
	},
	{
		name: "Kuat",
		coordinates: "M-10",
		x: 23, // 2802.19
		y: -8, // -899.37
		sectorCoordinates: {
			x: 11,
			y: 4
		}
	},
	{
		name: "Reecee",
		coordinates: "J-8",
		x: -16,
		y: 13,
		sectorCoordinates: {
			x: 8,
			y: 1
		}
	},
	{
		name: "Arkania",
		coordinates: "M-8",
		x: 13,
		y: 12,
		sectorCoordinates: {
			x: 1,
			y: 0
		}
	},
	{
		name: "Commenor",
		coordinates: "N-10",
		x: 28,
		y: -12,
		sectorCoordinates: {
			x: 4,
			y: 0
		}
	},
	{
		name: "Yavin",
		coordinates: "P-6",
		x: 58, // 6875.92
		y: 45, // 5980.07
		sectorCoordinates: {
			x: 10,
			y: 9
		}
	},
	{
		name: "Hoth",
		coordinates: "K-18",
		x: -11,
		y: -103,
		sectorCoordinates: {
			x: 1,
			y: 5
		}
	},
	{
		name: "Ryloth",
		coordinates: "R-17",
		x: 81,
		y: -92,
		sectorCoordinates: {
			x: 9,
			y: 4
		}
	},
	{
		name: "Smuggler's Run",
		coordinates: "S-18",
		x: 88, // 10941.27
		y: -97, // -12027.74
		sectorCoordinates: {
			x: 4,
			y: 11
		}
	},
	// {
	// 	name: "Wrea",
	// 	coordinates: "S-17",
	// 	x: 85,
	// 	y: -95,
	// 	sectorCoordinates: {
	// 		x: 1,
	// 		y: 1
	// 	}
	// },
	{
		name: "Corellia",
		coordinates: "M-11",
		x: 18, // 2363.29
		y: -20, // -2790.57
		sectorCoordinates: {
			x: 6,
			y: 4
		}
	}
];



function sectorToGalacticCoordinates(SystemObject) {

	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXZ";
	var sectorAlpha = SystemObject.coordinates.split('-')[0];
	var sectorNumeral = SystemObject.coordinates.split('-')[1];

	if(alphabet.indexOf(sectorAlpha) > 0) {

		var sectorAlphaNumber = parseInt(alphabet.indexOf(sectorAlpha));
		var sectorNumeralNumber = parseInt(sectorNumeral);
		var galacticColumn = sectorAlphaNumber - 11;
		var galacticRow = 9 - sectorNumeralNumber;
		var xValueTemp = 12 * galacticColumn + SystemObject.sectorCoordinates.x;
		var yValueTemp = 12 * galacticRow + SystemObject.sectorCoordinates.y;

		return {
			x: xValueTemp,
			y: yValueTemp
		};
	}
};



function generateGalaticCoordinates(coordinateArrayTemp) {

	for(var i=0; i < coordinateArrayTemp.length; i++) {

		let currentCoordinateTemp = coordinateArrayTemp[i];





	}




}
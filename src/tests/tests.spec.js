const lib = require('../lib/calculations');

describe("Vehicle to Planet reachability", () => {
    test("Space pod should not reach Planet Jebbing", () => {
        const jebbing = mockData.planets[0];
        const space_pod = mockData.vehicles[0];

        expect(lib.vehiclePlanetCompatibility(space_pod, jebbing)).toEqual(false);
    })

    test("Space rocket should reach Planet Enchai", () => {
        const space_rocket = mockData.vehicles[1];
        const enchai = mockData.planets[1]

        expect(lib.vehiclePlanetCompatibility(space_rocket, enchai)).toEqual(true);
    })

    test("missing data should return false", () => {
        const space_pod = mockData.vehicles[0];
        const missing = {};

        expect(lib.vehiclePlanetCompatibility(space_pod, missing)).toEqual(false);
    })
})


const mockData = {
    planets: [
        {
            "name": "Jebbing",
            "distance": 300
        },
        {
            "name": "Enchai",
            "distance": 200
        }
    ],
    vehicles: [
        {
            "name": "Space pod",
            "total_no": 2,
            "max_distance": 200,
            "speed": 2
        },
        {
            "name": "Space rocket",
            "total_no": 1,
            "max_distance": 300,
            "speed": 4
        }
    ]
}
export default function algorithm(roomList) {
 const output = {rum: 0, area: 0, mpress: 0};

    roomList.forEach((room) => {
        let rum = 0;
        let area = 0;
        let mpress = 0;
        if (room.group == "Ihop") {
            if (room.lights < 11) {
                rum += 1
            } else {
                area += Math.ceil(room.lights / 100)
            }
        } else if (room.dali == "DALI") {
            rum += Math.ceil(room.lights / 4)
        } else if (room.dali == "DALI TW" || room.dali == "DALI RGB") {
            rum += room.lights
        };
        mpress += room.switches;

        output.rum += rum * room.noOfRooms;
        output.area += area * room.noOfRooms;
        output.mpress += mpress * room.noOfRooms;
    });

    return {"Vadsbox Rum": output.rum, "Vadsbox Area": output.area, "Mpress": output.mpress};
}
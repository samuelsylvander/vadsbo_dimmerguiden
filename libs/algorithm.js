export default function algorithm(roomList) {
    const output = {rum: 0, area: 0, mpress: 0};

    roomList.forEach((room) => {
        if (room.group == "Ihop") {
            if (room.lights < 11) {
                output.rum += 1
            } else {
                output.area += Math.ceil(room.lights / 100)
            }
        } else if (room.dali == "DALI") {
            output.rum += Math.ceil(room.lights / 4)
        } else if (room.dali == "DALI TW" || room.dali == "DALI RGB") {
            output.rum += room.lights
        };
        output.mpress += room.switches;
    });

    return {"Vadsbox Rum": output.rum, "Vadsbox Area": output.area, "Mpress": output.mpress};
}
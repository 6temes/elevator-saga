// http://play.elevatorsaga.com/#challenge=5

aa = {
    init: function (elevators, floors) {

        var maxFloor = 4;


        function getClosestFloor(currentFloor, queue) {
            var minDistance,
                best;

            queue.forEach(function (floor) {
                var distance = Math.abs(floor - currentFloor);
                if (!minDistance || distance < minDistance) {
                    best = floor;
                    minDistance = distance;
                }
            });
            return best;
        }

        function findNearestElevator(floorNum) {
            var minDistance,
                best;

            elevators.forEach(function (elevator) {
                var distance = Math.abs(floorNum - elevator.currentFloor());
                if (!minDistance || distance < minDistance) {
                    best = elevator;
                    minDistance = distance;
                }
            });
            return best;
        }

        floors.forEach(function (floor) {
            var floorNum = floor.floorNum();

            floor.on("up_button_pressed", function () {
                var designated = findNearestElevator(floorNum);
                var queue = designated.destinationQueue || [];
                designated.destinationQueue.push(floorNum);
                designated.checkDestinationQueue();
            });
            floor.on("down_button_pressed", function () {
                var designated = findNearestElevator(floorNum);
                var queue = designated.destinationQueue || [];
                designated.destinationQueue.push(floorNum);
                designated.checkDestinationQueue();
            });
        });

        elevators.forEach(manageElevator);
        function manageElevator(elevator) {

            elevator.direction = function (direction) {
                if (direction === "up") {
                    elevator.goingUpIndicator(true);
                    elevator.goingDownIndicator(false);
                } else if (direction === "down") {
                    elevator.goingUpIndicator(false);
                    elevator.goingDownIndicator(true);
                } else if (direction === "any") {
                    elevator.goingUpIndicator(true);
                    elevator.goingDownIndicator(true);
                } else if (direction) {
                    elevator.goingUpIndicator(false);
                    elevator.goingDownIndicator(false);
                }

                if (elevator.goingUpIndicator() && !elevator.goingDownIndicator()) {
                    return "up";
                } else if (!elevator.goingUpIndicator() && elevator.goingDownIndicator()) {
                    return "down";
                } else if (elevator.goingUpIndicator() && elevator.goingDownIndicator()) {
                    return "any";
                }
            };

            elevator.on("idle", function () {
                console.log("hola");

                if (elevator.getPressedFloors().length > 0) {
                    var nextFloor = getClosestFloor(elevator.currentFloor(), elevator.getPressedFloors());

                    designated.destinationQueue.push(nextFloor);
                    designated.checkDestinationQueue();
                }
            });

        }
    },
    update: function (dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}

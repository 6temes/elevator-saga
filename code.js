// http://play.elevatorsaga.com/#challenge=5

{
    init: function(elevators, floors) {

        function getClosestFloor(queue, currentFloor) {
            var minDistance = 99;
            var best;

            queue.forEach(function(floor) {

                var distance;
                if (floor > currentFloor) {
                    distance = floor - currentFloor;
                } else {
                    distance = currentFloor - floor;
                }
                if (distance < minDistance) {
                    best = floor;
                    minDistance = distance;
                }
            });

            return best;
        }

        elevators.forEach(manageElevator);

        function manageElevator(el) {
            function goingUp() {
                el.goingUpIndicator(true);
                el.goingDownIndicator(false);
            }

            function goingDown() {
                el.goingUpIndicator(false);
                el.goingDownIndicator(true);
            }

            var nextFloor = 4;
            el.goToFloor(5);
            goingUp();

            el.on("idle", function() {

                if (el.getPressedFloors().length > 0) {
                    var floorQueue = el.getPressedFloors();

                    nextFloor = getClosestFloor(floorQueue, el.currentFloor());

                    if (nextFloor > el.currentFloor()) {
                        goingUp();
                    } else {
                        goingDown();
                    }

                } else if (el.goingUpIndicator()) {
                    nextFloor += 1;
                } else {
                    nextFloor -= 1;
                }
                el.goToFloor(nextFloor);

                if (el.currentFloor() === 5) {
                    goingDown();
                }
                if (el.currentFloor() === 0) {
                    goingUp();
                }
            })
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}

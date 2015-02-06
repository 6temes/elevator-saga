// http://play.elevatorsaga.com/#challenge=5

game = {
    init: function (elevators, floors) {

        var maxFloor = 4;

        elevators.forEach(manageElevator);

        function manageElevator(elevator) {

            elevator._dir = "";
            elevator.direction = function (direction) {
                if (direction === "up") {
                    this.goingUpIndicator(true);
                    this.goingDownIndicator(false);
                    this._dir = "up";
                } else if (direction === "down") {
                    this.goingUpIndicator(false);
                    this.goingDownIndicator(true);
                    this._dir = "down";
                } else if (direction === "stop") {
                    this.goingUpIndicator(true);
                    this.goingDownIndicator(true);
                    this._dir = "";
                }
                return this._dir;
            };
            elevator.hasPassengers = function () {
                return elevator.getPressedFloors().length > 0;
            };
            elevator.getClosestFloor = function (queue) {
                var minDistance,
                    best,
                    currentFloor = this.currentFloor();

                queue.forEach(function (floor) {
                    var distance = Math.abs(floor - currentFloor);
                    if (!minDistance || distance < minDistance) {
                        best = floor;
                        minDistance = distance;
                    }
                });

                return best;
            };

            elevator.roam = function () {
                var nextFloor = this.currentFloor();

                if (this.direction() !== "up" && this.direction() !== "down") {
                    if (this.currentFloor() < maxFloor) {
                        this.direction("up");
                    } else {
                        this.direction("down");
                    }
                }

                if (this.direction() === "up") {
                    nextFloor = this.currentFloor() + 1;
                } else if (this.direction() === "down") {
                    nextFloor = this.currentFloor() - 1;
                }

                this.goToFloor(nextFloor);

                if (nextFloor === 0) {
                    this.direction("up");
                } else if (nextFloor === maxFloor) {
                    this.direction("down")
                }
            };
            elevator.moveToClosestDestination = function () {
                var closestDestination = this.getClosestFloor(this.getPressedFloors());

                this.direction("stop");

                this.goToFloor(closestDestination);
            };

            elevator.goToFloor(maxFloor);
            elevator.on("idle", function () {
                if (this.hasPassengers()) {
                    this.moveToClosestDestination();
                }
                this.roam();
            })
        }
    },
    update: function (dt, elevators, floors) {
        // We normally don't need to do anything here
    }
};

/*
 function zeroToNToOne(n) {
 var i,
 r,
 res = [];

 for (i = 0; i <= (n * 2) - 1; i++) {
 if (i <= n) {
 r = i;
 } else {
 r = n - (i % n);
 }
 res.push(r);
 }
 return res;
 }
 */
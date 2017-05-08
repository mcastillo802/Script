var movementDelays = [];

var ramesesCollisionReaction = function(){};

var gotBagel = false;
var challengeOneStarted = false;
function startChallengeOne() {
    gotBagel = false;
    challengeOneStarted = true;
}

var challengeTwoStarted = false;
var gotPencils = false;
var gotBluebook = false;
var texted = false;

function startChallengeTwo() {
    challengeTwoStarted = true;
    gotPencils = false;
    gotBluebook = false;
    texted = false;
}

var rameses = {};
    rameses.name = "Rameses";
    rameses.thought= "What a GDTBATH...";
    rameses.direction= "E";
    rameses.isColliding= false;
    rameses.isAgainstWall= false;
    rameses.isFacingWall= false;
    rameses.collision= true;
    rameses.isMoving= false;
    rameses.onScreen= true;
    rameses.speed= 250;
    rameses.pX= 2600;
    rameses.pY= 1650;
    rameses.X= 52; // used to be rameses.bX
    rameses.Y= 33; // used to be rameses.bY
    rameses.distanceLeft= 0;

    rameses.pendingCallback= function(){};

    rameses.setCollisionReaction= function(colCallback) {
    	ramesesCollisionReaction = colCallback;
    };

    rameses.purchasePencils = function() {
        if(rameses.X != 53 || rameses.Y != 46) {
            rameses.alert("I probly should go to the student stores for those!");
        } else {
            rameses.alert("Got my pencils!");
            if(challengeTwoStarted) {
                gotPencils = true;
            }
        }
    }

    rameses.purchaseBluebook = function() {
        if(rameses.X != 53 || rameses.Y != 46) {
            rameses.alert("I probly should go to the student stores for those!");
        } else {
            rameses.alert("Got my bluebooks");
            if(challengeTwoStarted) {
                gotBluebook = true;
            }
        }
    }

    rameses.textFriend = function() {

        if(rameses.X > 42 || rameses.X < 40 || rameses.Y > 31 || rameses.Y < 29) {
            rameses.alert("I should probably wait to do that until I reach the library..");
        } else {
            var chance = Math.random();
            texted = true;
            if(chance > 0.1) {
                rameses.alert("Hmm, he isnt responding, maybe I should try calling");
                return false;
            } else {
                alert("Text Recieved: \"Hey Rameses, I am on my way down!\""); 
		
		    if(gotPencils && gotBluebook){
			alert("You have successfully completed challenge 2!");
		    } else {
			alert("You forgot the pencils and bluebook...");
			alert("Challenge Failed");
		    }
		challengeTwoStarted = false;            
                return true;
            }
        }
    }

    rameses.callFriend = function() {
        if(rameses.X > 42 || rameses.X < 40 || rameses.Y > 31 || rameses.Y < 29) {
            rameses.alert("I should probably wait to do that until I reach the library..");
        } else {            
            if(!texted) {
                alert("Challenge failed, you disrupted the whole library without trying to text him first!!");
            } else {
                alert("Hey Rameses, I am on my way down!");
                alert("You have successfully completed challenge 2!");
                challengeTwoStarted = false;
            }
        }
    }

    rameses.purchaseAlpine = function() {
        if(rameses.X != 60 || rameses.Y != 36) {
            rameses.alert("Oops, it doesnt look like Im at alpine!!");
        } else {
            rameses.alert("Got my bagel!");
            if(challengeOneStarted) {
                gotBagel = true;
            }
        }
    };

    rameses.eatAlpine = function() {
        if(rameses.X != 52 || rameses.Y != 33) {
            rameses.alert("I probably shouldnt do that here...");
        } else {
            if(challengeOneStarted) {
                alert("Congrats! You completed challenge 1!");
                challengeOneStarted = false;
            }
        }
    };

    rameses.move = function(x,y) {
        
        if(isNaN(x) || isNaN(x)) {
            throw new TypeError("move() only accepts legal numbers");
        }

        var moveX = x;
        var moveY = y;
        
        var thisDistance = Math.abs(x) + Math.abs(y);
        
        var speed = this.speed;
                
        //$("#rameses").stop(true,false);
        $("#rameses").css("left", blockToPx(rameses.X));
        $("#rameses").css("top", blockToPx(rameses.Y));

        if( moveX > 0 ) {
            rameses.direction = "E";
        } else if( moveX < 0 ) {
            rameses.direction = "W";
        }


        $("#rameses").animate({
            left: "+=" + (moveX * 50),
        }, speed * Math.abs(moveX), function() {
            
            if( moveY > 0 ) {
                rameses.direction = "S";
            } else if( moveY < 0 ) {
                rameses.direction = "N";
            }

            $("#rameses").animate({
                top: "+=" + (moveY * 50),
            }, speed * Math.abs(moveY), function() {
                rameses.distanceLeft -= thisDistance;
            })
        })
        return null;
    };


	rameses.moveWithCB = function(x,y, callback) {
        
        if(isNaN(x) || isNaN(x)) {
            throw new TypeError("move() only accepts legal numbers");
        }

        var moveX = x;
        var moveY = y;
        
        var thisDistance = Math.abs(x) + Math.abs(y);
        
        var speed = this.speed;
                
        //$("#rameses").stop(true,false);
        $("#rameses").css("left", blockToPx(rameses.X));
        $("#rameses").css("top", blockToPx(rameses.Y));

        if( moveX > 0 ) {
            rameses.direction = "E";
        } else if( moveX < 0 ) {
            rameses.direction = "W";
        }

        rameses.pendingCallback = callback;

        $("#rameses").animate({
            left: "+=" + (moveX * 50),
        }, speed * Math.abs(moveX), function() {
            
            if( moveY > 0 ) {
                rameses.direction = "S";
            } else if( moveY < 0 ) {
                rameses.direction = "N";
            }

            $("#rameses").animate({
                top: "+=" + (moveY * 50),
            }, speed * Math.abs(moveY), function() {
                rameses.distanceLeft -= thisDistance;
                rameses.pendingCallback = function(){};
                callback();
            })
        })
        return null;
    };

    rameses.moveRight = function(amount) {
        var delay = rameses.distanceLeft * 250;
        rameses.distanceLeft += Math.abs(amount);
        movementDelays.push(setTimeout(function() {
            rameses.move(amount,0);
        },delay + 200));
        
    };
//     rameses.moveRight = function() {
//         var delay = rameses.distanceLeft * 250;
//         rameses.distanceLeft += Math.abs(1);
//         movementDelays.push(setTimeout(function() {
//             rameses.move(1,0);
//         },delay + 200));
        
//     };

    rameses.moveLeft = function(amount) {
        var delay = rameses.distanceLeft * 250;
        rameses.distanceLeft += Math.abs(amount);
        movementDelays.push(setTimeout(function() {
            rameses.move(-1*amount,0);
        },delay + 200));
    };

//     rameses.moveLeft = function() {
//         var delay = rameses.distanceLeft * 250;
//         rameses.distanceLeft += Math.abs(1);
//         movementDelays.push(setTimeout(function() {
//             rameses.move(-1,0);
//         },delay + 200));
//     };

    rameses.moveUp = function(amount) {
        var delay = rameses.distanceLeft * 250;
        rameses.distanceLeft += Math.abs(amount);
        movementDelays.push(setTimeout(function() {
            rameses.move(0,-1*amount);
        },delay + 200));
    };

//     rameses.moveUp = function() {
//         var delay = rameses.distanceLeft * 250;
//         rameses.distanceLeft += Math.abs(1);
//         movementDelays.push(setTimeout(function() {
//             rameses.move(0,-1);
//         },delay + 200));
//     };

    rameses.moveDown = function(amount) {
        var delay = rameses.distanceLeft * 250;
        rameses.distanceLeft += Math.abs(amount);
        movementDelays.push(setTimeout(function() {
            $("#rameses_sprite").addClass("running");
            rameses.move(0, amount);
        },delay + 200));
    };

//     rameses.moveDown = function() {
//         var delay = rameses.distanceLeft * 250;
//         rameses.distanceLeft += Math.abs(1);
//         movementDelays.push(setTimeout(function() {
//             $("#rameses_sprite").addClass("running");
//             rameses.move(0, 1);
//         },delay + 200));
//     };

    rameses.alert = function(speak){
       var delay = rameses.distanceLeft * 250;
//         rameses.distanceLeft += 16;
       // movementDelays.push(
	setTimeout(function() {
            //var currentDelay = rameses.distanceLeft;
            //rameses.distanceLeft = 0;
            $("#bubble").text(speak);
            $("#speech_wrap").fadeIn(500);
            setTimeout(function() {
                $("#speech_wrap").fadeOut(500);
//                   rameses.distanceLeft -= 0;
            }, 3000);
        },delay);
	//);
    };

    rameses.moveRightAndDo = function(amount, callback) {
        var delay = rameses.distanceLeft * 250;
        rameses.distanceLeft += Math.abs(amount);
        movementDelays.push(setTimeout(function() {
            rameses.moveWithCB(amount,0,callback);
        },delay + 200));
        
    };

    rameses.moveLeftAndDo = function(amount, callback) {
        var delay = rameses.distanceLeft * 250;
        rameses.distanceLeft += Math.abs(amount);
        movementDelays.push(setTimeout(function() {
            rameses.moveWithCB(-1*amount,0,callback);
        },delay + 200));
    };

    rameses.moveUpAndDo = function(amount, callback) {
        var delay = rameses.distanceLeft * 250;
        rameses.distanceLeft += Math.abs(amount);
        movementDelays.push(setTimeout(function() {
            rameses.moveWithCB(0,-1*amount,callback);
        },delay + 200));
    };
	
    rameses.moveDownAndDo = function(amount, callback) {
        var delay = rameses.distanceLeft * 250;
        rameses.distanceLeft += Math.abs(amount);
        movementDelays.push(setTimeout(function() {
            $("#rameses_sprite").addClass("running");
            rameses.moveWithCB(0, amount, callback);
        },delay + 200));
    };

// Cursor
var cursor = {
    control: false,
    pX: 0,
    pY: 0,
    X: 0,
    Y: 0
}

// Viewing rectangle
var render = {
    offX: 0,
    offY: 0,
    height: 0,
    width: 0
}

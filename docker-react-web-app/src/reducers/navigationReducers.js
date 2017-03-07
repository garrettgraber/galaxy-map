
export function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}




/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */


// reducer
export  function grid(state, action) {
	console.log("grid state: ", state);
	if (typeof state === 'undefined') {
    	state = true; // default state
    }
    switch (action.type) {
    	
        case 'TOGGLE GRID':
        	console.log("grid state: ", state);
        	return (state) ? false : true;
        default:
        	return state;
    }
}


export  function regions(state, action) {
	console.log("regions state: ", state);
	if (typeof state === 'undefined') {
    	state = true; // default state
    }
    switch (action.type) {
        case 'TOGGLE REGIONS':
        	console.log("regions state: ", state);
        	return (state) ? false : true;
        default:
        	return state;
    }

}

export  function stars(state, action) {
	console.log("stars state: ", state);
	if (typeof state === 'undefined') {
    	state = true; // default state
    }
    switch (action.type) {
        case 'TOGGLE STARS':
        	console.log("stars state: ", state);
        	return (state) ? false : true;
        default:
        	return state;
    }

}

export  function map(state, action) {
	console.log("map state: ", state);
	if (typeof state === 'undefined') {
    	state = true; // default state
    }
    switch (action.type) {
        case 'TOGGLE MAP IMAGE':
        	console.log("map state: ", state);
        	return (state) ? false : true;
        default:
        	return state;
    }	
}

export  function population(state = false, action) {
	console.log("population state: ", state);
	if (typeof state === 'undefined') {
    	state = false; // default state
    }
    switch (action.type) {
        case 'TOGGLE POPULATION':
        	console.log("population state: ", (state) ? false : true);
        	return (state) ? false : true;
        default:
        	return state;
    }	
}


export function currentSystems(state = [], action) {

	switch (action.type) {
		case 'DISPLAY_SYSTEMS':
			console.log("display system state: ", action);
			return action.payload;
		default:
			return state;
	}

}


export function systems(state = false, action) {
    console.log("systems state: ", state);
    if (typeof state === 'undefined') {
        state = false; // default state
    }
    switch (action.type) {
        case 'SYSTEMS_ON':
            console.log("systems state: ", state);
            return  true;
        case 'SYSTEMS_OFF':
            console.log("systems state: ", state);
            return false;
        case 'SYSTEMS_TOGGLE':
            console.log("systems state: ", state);
            return (state) ? false : true;
        default:
            return state;
    }   

}

export const increment = (nr) => {
    return {
        type: 'INCREMENT',
        payload: nr
    }
}

export const decrement = (nr) => {
    return {
        type: 'INCREMENT',
        payload: nr
    }
}


export const depositMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "deposit",
            payload: amount
        });
    }
}

export const withdrawMoney = (amount) => {
    console.log(amount, "Lol")
    return (dispatch) => {
        dispatch({
            type: "withdraw",
            payload: amount
        });
    }
}



export const loginUser = (username, password) => {
    return (dispatch) => {
        dispatch(({ username }));

        dispatch({
            type: "login",
            payload: [username, password]
        });
    }
}
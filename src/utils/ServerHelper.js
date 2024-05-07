

export const makeUnauthenticatedPOSTRequest = async (route, body) => {

    const response = await fetch('http://localhost:8080' + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    console.log(formattedResponse
        )
        // const date = new Date();
        // date.setDate(date.getDate() + 30)
        // setCookie("data", formattedResponse, {path: "/", expires:date});

    return formattedResponse;
};

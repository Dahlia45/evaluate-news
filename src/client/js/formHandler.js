function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let inputUrl = document.getElementById('url').value

    // check what text was put into the form field
    console.log('==>>', inputUrl)
        if (Client.checkURL(inputUrl)) {
            // if (checkURL(inUrl)) {
            resfetch(inputUrl)
            showRes()
        } else {
            alert('Invalid URL.\nPlease try with appropriate URL. ');
        
        }
}
const resfetch = async (inputUrl) => {
    await fetch('http://localhost:8081/fetch', {
        method: 'POST',
        body: JSON.stringify({ url: inputUrl }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
let showRes = async () => {
    // fetch the data from the app endpoint  
    const data = await fetch('http://localhost:8081/data')
    const res = await data.json()
    if (res !== undefined) {
        document.getElementById('score_tag').innerHTML = `Score Tag: ${res.score_tag}`;
        document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
        document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
    }

}

export { handleSubmit }

const myForm = document.getElementById("comment_form")
const pData = document.getElementById("data")
console.log(myForm)

myForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    console.log(e.target);
    const comment = formData.get("comment")

    console.log(comment);
    const res = await fetch('http://127.0.0.1:5000/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: comment })
    })

    const resData = await res.json()
    const sentiment=resData.comment
    pData.innerText = sentiment
    pData.classList.remove('hidden')
    if(sentiment===`Positive`){
        pData.classList.add('positive')
        pData.classList.remove('negative')
        pData.classList.remove('neutral')
    }
    else if(sentiment===`Negative`){
        pData.classList.remove('positive')
        pData.classList.add('negative')
        pData.classList.remove('neutral')
    }
    else{
        pData.classList.remove('positive')
        pData.classList.remove('negative')
        pData.classList.add('neutral')
    }


    console.log("res", resData)

})


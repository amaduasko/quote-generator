const quoteContainer = document.getElementById('quote-container')
const quote = document.getElementById('quote')
const author = document.getElementById('author')

const tritterButton = document.getElementById('twitter')
const newQuoteButton = document.getElementById('new-quote')
const quoteLang = document.getElementById('quote-lang')
const loader = document.getElementById('loader')

// quote lang hangling
const lang = { active: quoteLang.value }

const changeQuoteLang = (event) => (lang.active = event.target.value)

// loader handling

const onLoadingQuote = () => {
    quoteContainer.hidden = true
    loader.hidden = false
}
const onCompleteLoadingQuote = () => {
    quoteContainer.hidden = false
    loader.hidden = true
}

// Get Quote from api

const getQuote = async (lang) => {
    onLoadingQuote()
    const proxyUrl = 'https://agile-reef-39653.herokuapp.com/'
    const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=${lang.active}&format=json`

    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()

        author.innerText =
            data.quoteAuthor !== '' ? data.quoteAuthor : 'Unknown'
        // Reduce font-size for long quotes
        if (data.quoteText.length > 120) {
            quote.classList.add('long-quote')
        } else {
            quote.classList.remove('long-quote')
        }
        quote.innerText = data.quoteText
        onCompleteLoadingQuote()
    } catch (error) {
        // self-callback
        getQuote(lang)
    }
}

// Tweet quote

const tweetQuote = () => {
    const quoteText = quote.innerText
    const quoteAuthor = author.innerText
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${quoteAuthor}`
    window.open(tweetUrl, '_blank')
}

// handle listeners

newQuoteButton.addEventListener('click', () => getQuote(lang))
tritterButton.addEventListener('click', tweetQuote)
quoteLang.addEventListener('change', changeQuoteLang)

// on load
window.onload = () => getQuote(lang)

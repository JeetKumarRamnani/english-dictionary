const inputEl = document.getElementById('inputBox');
const meaningContainerEl = document.getElementById('meaningContainer');
const titleEl = document.getElementById('titleOfWord');
const meaningEl = document.getElementById('definationOfWord');
const infoText = document.getElementById('infoText');
const audioEl = document.getElementById('audioElement');
const resetEl = document.getElementById('resetButton');

// console.log(inputEl, titleEl, meaningEl);

async function fetchData(word) {
    try {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        meaningContainerEl.style.display = 'none';
        infoText.style.display = 'block';
        infoText.innerText = `Searching The Meaning Of ${word}`;

        const result = await fetch(url).then(res => res.json());

        // console.log(result);

        if (result.title) {
            resetEl.addEventListener('click', function () {
                location.reload();
            });
            infoText.style.display = 'none';
            meaningContainerEl.style.display = 'block';
            titleEl.innerHTML = `<strong style="color:red;">Word Title</strong>: ${word}`;
            meaningEl.innerHTML = `<strong style="color:red;">Meaning:</strong> Not Found Sorry`;
            audioEl.style.display = 'none';
        } else {
            resetEl.addEventListener('click', function () {
                location.reload();
            });
            infoText.style.display = 'none';
            audioEl.style.display = 'block';
            meaningContainerEl.style.display = 'block';
            titleEl.innerHTML = `<strong style="color:red;">Word Title</strong>: ${result[0].word}`;
            meaningEl.innerHTML = `<strong style="color:red;">Meaning:</strong> ${result[0].meanings[0].definitions[0].definition}`;
            audioEl.src = result[0].phonetics[0].audio;
        }
    } catch (error) {
        // console.log(result.title);
    }
}

inputEl.addEventListener('keyup', function (e) {
    if (e.target.value && e.key == 'Enter') {
        fetchData(e.target.value);
    }
});

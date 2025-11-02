const rows = document.querySelectorAll('#crossword tr');
const secretEls = document.querySelectorAll('.secret');
const secretDiv = document.querySelector('#secret');
const secretBtn = document.querySelector('#validate-password');

secretBtn.addEventListener('click', checkPassword);

function checkAnswers() {
    let allCorrect = true;
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const answer = row.dataset.answer;
        let word = '';
        inputs.forEach(i => word += (i.value || '').toUpperCase());
        if (word !== answer) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        secretEls.forEach(el => {
            el.style.background = '#FF706D';
            el.style.border = '1px solid #871615';
            el.style.color = 'white';
        });
        secretDiv.style.display = 'flex';
    } else {
        secretEls.forEach(el => {
            el.style.background = '#D2BD96';
            el.style.border = '1px solid #FFFFFF';
            el.style.color = 'black';
        });
    }

}

function checkPassword() {
    const password = 'secret';
    const answer = secretDiv.querySelector('input').value.trim().toLowerCase();

    if (answer === password) {
        secretDiv.querySelector('a').style.display = 'block';
        secretDiv.querySelector('.message').textContent = '';
    } else {
        secretDiv.querySelector('.message').textContent = 'Wrong password !'
    }
}


// pour verifier les reponses
document.querySelectorAll('input').forEach((input, index, allInputs) => {
    input.addEventListener('input', e => {
        checkAnswers();

        if (e.target.value && index < allInputs.length - 1) {
            allInputs[index + 1].focus();
        }
    });
    input.addEventListener('keydown', e => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
            allInputs[index - 1].focus();
        }
    });
});


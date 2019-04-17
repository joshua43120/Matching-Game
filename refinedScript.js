var boxes;
var hasFlipped = false;
var firstBox, secondBox;
var lockBoard = false;

function init() {
    boxes = document.querySelectorAll('.boxes');

    boxes.forEach(box => box.addEventListener('click', flip));
}

function flip() {
    if (lockBoard) return;
    if (this === firstBox) return;
    this.classList.add('flip');
    if (!hasFlipped) {

        hasFlipped = true;
        firstBox = this;
    }
    else {
        hasFlipped = false;
        secondBox = this;
        if (firstBox.dataset.image === secondBox.dataset.image) {
            if (secondBox.dataset.image === "bowser" || secondBox.dataset.image === "junior") {
                lockBoard = true;
                setTimeout(() => {
                    alert("Game over!!!");
                    boxes.forEach(box => {
                        box.classList.remove('flip');
                    });
                    init();
                    resetBoard();
                    shuffle();
                }, 700);

            }
            else {
                firstBox.removeEventListener('click', flip);
                secondBox.removeEventListener('click', flip);
                resetBoard();
            }
        }

        else {
            lockBoard = true;
            setTimeout(() => {
                firstBox.classList.remove('flip');
                secondBox.classList.remove('flip');
                resetBoard();
            }, 700);
        }

    }
}
function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstBox, secondBox] = [null, null];
}

function shuffle() {
    boxes.forEach(box => {
        let randomPos = Math.floor(Math.random() * 18);
        box.style.order = randomPos;
    })
}
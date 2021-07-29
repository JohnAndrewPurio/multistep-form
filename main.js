const stepsInstructions = ['title', 'description']
const steps = document.querySelector('.steps')
const procedures = document.querySelector('.procedures')
let counter = 1
let currentStep = counter

function renderSteps() {
    while (steps.firstChild) {
        steps.removeChild(steps.firstChild)
    }

    const temp = document.getElementById('step')

    stepsInstructions.forEach((instruction, index) => {
        const clone = temp.content.cloneNode(true)
        const stepNo = clone.querySelector('.count')
        const title = clone.querySelector('.title')

        if ((index + 1) <= counter) {
            stepNo.onclick = () => {
                currentStep = index + 1

                renderSteps()
                renderProcedure()
            }

        }

        if ((index + 1) <= currentStep)
            stepNo.classList.add('selected')

        stepNo.innerText = index + 1
        title.innerText = `Choose ${instruction}`

        steps.appendChild(clone)
    })

    const clone = temp.content.cloneNode(true)
    const stepNo = clone.querySelector('.count')
    const title = clone.querySelector('.title')

    if ((stepsInstructions.length + 1) === currentStep)
        stepNo.classList.add('selected')

    if ((stepsInstructions.length + 1)  === counter) {
        stepNo.onclick = () => {
            currentStep = stepsInstructions.length + 1
            
            renderSteps()
            renderProcedure()
        }
    }

    stepNo.innerText = stepsInstructions.length + 1
    title.innerText = `Confirm data`

    steps.appendChild(clone)
}

function renderProcedure() {
    while (procedures.firstChild) {
        procedures.removeChild(procedures.firstChild)
    }

    const temp = document.getElementById('procedure')
    const clone = temp.content.cloneNode(true)

    const name = clone.querySelector('.content')
    const prevButton = clone.querySelector('.prev')
    const nextButton = clone.querySelector('.next')

    if ((currentStep - 1) === stepsInstructions.length) {
        name.innerText = `Are you happy now?`
        nextButton.innerText = `End`
    } else {
        if (currentStep === 1)
            prevButton.classList.add('hidden')

        name.innerText = `Choose ${stepsInstructions[currentStep - 1]}`
        nextButton.innerText = `Submit ${stepsInstructions[currentStep - 1]}`
    }

    procedures.appendChild(clone)
}

function prev() {
    if (currentStep === 1)
        return

    currentStep--
    renderSteps()
    renderProcedure()

    console.log(counter, currentStep)
}

function next() {
    if (currentStep === (stepsInstructions.length + 1)) {
        window.location.reload()

        return
    }

    if (counter === currentStep)
        counter++

    currentStep++
    renderSteps()
    renderProcedure()

    console.log(counter, currentStep)
}

renderSteps()
renderProcedure()
const dragables = document.querySelectorAll(".draggable")
const containers = document.querySelectorAll(".container")

const numberInput = () => {
    const items = document.querySelectorAll(".draggable")
    const checkBox = document.getElementById("phn")
    const telnum = document.getElementById("PhnNumber")
    // const or = document.getElementById("or")
    if (checkBox.checked == true) {
        telnum.style.display = "grid";
        // or.style.display = "grid";
        items.forEach((item) => {
            item.classList.add('highlight')
        })
    } else {
        telnum.style.display = "none";
        // or.style.display = "none";

        items.forEach((item) => {
            item.classList.remove('highlight')
        })
    }
}

dragables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
});

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        // Prevent default arrow
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}



document.addEventListener('DOMContentLoaded', function () {
    const stickyNotesGrid = document.getElementById('stickyNotesGrid');
    const addStickyNoteButton = document.getElementById('addStickyNote');
    const search=document.querySelector('.search-bar input')

    search.addEventListener('click',()=>{
        window.open("search",target="_self")
    })
    let stickyNoteIndex = 0;
    
    // Function to add a new sticky note
    function addStickyNote() {
        const stickyNote = document.createElement('div');
        stickyNote.classList.add('sticky-note');

        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close-btn');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', function () {
            stickyNote.remove();
        });

        const textarea = document.createElement('textarea');
        textarea.className=`${stickyNoteIndex}`

        const debouncedUpdate = debounce(async (event) =>{
            // Log the updated text after a delay of 2 seconds
            // console.log(`Sticky Note Index: ${event.target.className}, Text Updated: ${textarea.value}`);
           let i=Number(event.target.className)
           
           let fc=localStorage.getItem('flashcards').split(',')
           const userId=localStorage.getItem('userId')
           console.log(fc.length)
           if(i>=fc.length){
                console.log(Array.isArray(fc))
                fc.push(textarea.value)
           }
           else {
            fc[i]=textarea.value
           }
           const {data:{d:{flashcards}}}= await axios.patch('/api/v1/student',{
            userId,flashcards:fc
        })
        console.log(flashcards)
        localStorage.setItem("flashcards",flashcards);
        }, 2000);

        textarea.addEventListener('input', function (event) {
            // Call the debounced function
            debouncedUpdate(event);
        });

        stickyNote.appendChild(textarea);
        
        stickyNote.appendChild(closeBtn);

        stickyNote.classList.add(`sticky${stickyNoteIndex}`)
        stickyNotesGrid.appendChild(stickyNote);
        stickyNoteIndex++
    }

    const flashcards=localStorage.getItem('flashcards').split(',')
    console.log(flashcards.length)
    for(let j=0;j<flashcards.length;j++){
        if(flashcards[j].length>0){
        addStickyNote();
        document.querySelector(`.sticky${j} textarea`).value=flashcards[j]
        }
    }

    // Add initial sticky notes
    addStickyNote();

    // Event listener for the "Add Sticky Note" button
    addStickyNoteButton.addEventListener('click', addStickyNote);

    
});

function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}





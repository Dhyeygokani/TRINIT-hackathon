document.addEventListener('DOMContentLoaded', function () {
    const bookSlotsContainer = document.getElementById('bookSlotsContainer');
    
    const search=document.querySelector('.search-bar input')

    // Function to add a new book slot
    function addBookSlot(course,tutor,fee,ratin,courseId) {
        const bookSlot = document.createElement('div');
        bookSlot.classList.add('book-slot');

        const leftContent = document.createElement('div');
        leftContent.style.display = 'flex';
        leftContent.style.alignItems = 'center';

        const nameHeader = document.createElement('h3');
        nameHeader.textContent = course;

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${ratin}`;

        const price = document.createElement('p');
        price.textContent = `Price: $ ${fee}`;

        const tutorName = document.createElement('span');
        tutorName.textContent = `Tutor: ${tutor}`;

        leftContent.appendChild(nameHeader);
        leftContent.appendChild(rating);
        leftContent.appendChild(price);
        leftContent.appendChild(tutorName);

        const bookSlotButton = document.createElement('button');
        bookSlotButton.textContent = 'Book Slot';

        bookSlot.appendChild(leftContent);
        bookSlot.appendChild(bookSlotButton);
        bookSlotButton.className=`${courseId}`
    
        bookSlotsContainer.appendChild(bookSlot);

    
    }

    // Add initial book slot


    // Event listener for the "Add Book Slot" button
    // addBookSlotButton.addEventListener('click', addBookSlot);

    search.addEventListener('input', async function () {
        bookSlotsContainer.innerHTML=''
        const name = search.value;
        console.log(name)
        const {data:{courses}}= await axios.get(`/api/v1/courses?name=${name}`);
        for(let j=0;j<courses.length;j++){
            const {name,tutorname,fees,rating,_id}=courses[j]
            addBookSlot(name,tutorname,fees,rating,_id)
        }
    });



    // Event listener for the "Flashcards" button (for demonstration)
    const flashcardsButton = document.getElementById('flashcardsButton');
    flashcardsButton.addEventListener('click', function () {
        // Add your Flashcards functionality here
        window.open("studentHome",target="_self");
    });
});

const habitBtn = document.querySelector('button[type="submit"]');
const habitInput = document.getElementById('habit-name');
const habitList = document.getElementById('habit-list');
const clearData = document.getElementById("clear");



// Count the nuumber of habits completed
const countHabit = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checkedCount = 0;
    // Loop through each habits and check to see if any habit is checked then count / increase the number of habits completed
    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            checkedCount++
        }
    };

    const habitCount = document.getElementById('habit-count');
    habitCount.innerHTML = `${checkedCount} habits completed`
}

// Load the habit from the habitArray in localstorage
const loadHabit = () => {
    // Get the saved habitArray from localStorage and display it on the DOM
    const habitArray = JSON.parse(localStorage.getItem('habits'));
    // Loop through each habits to give it a checkbox
    if (habitArray) {
        habitArray.forEach(habit => {
        habitList.innerHTML +=
        `
        <div>
          <input type="checkbox" onchange="countHabit()">${habit}  
        </div>    
        `
        });
    }
    countHabit();
}

// Add a new habit each time the button is clicked
habitBtn.addEventListener("click", (event) => {
    // Prevent the form from submitting
    event.preventDefault(); 

    const habit = habitInput.value;
    habitList.innerHTML += `
        <div class="">
          <input type="checkbox" onchange="countHabit()">${habit}  
        </div>
    `
    habitInput.value = "";
    countHabit();
});


// Clear Data from Localstorage
clearData.addEventListener("click", () => {
    localStorage.clear();
    // Remove all habits from the habitList container
    habitList.textContent = "";
})



// LocalStorage 
window.addEventListener('beforeunload', () => {
    const habits = document.querySelectorAll("#habit-list div");
    const habitArray = Array.from(habits).map(habit => habit.textContent);
    localStorage.setItem('habits', JSON.stringify(habitArray));
});

// Load the stored HabitArray to the DOM
window.addEventListener('load', loadHabit);
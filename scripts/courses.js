const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// Course Filter Functions
// Course Render Function

// this is the mother container where all the courses will be distributed.
const certificateGrid = document.querySelector('.certificate-grid');

// Buttons
const allCoursesButton = document.getElementById('all-courses-button');
const uncompletedCoursesButton = document.getElementById('uncompleted-courses-button');
const cseCoursesButton = document.getElementById('cse-courses-button');
const wddCoursesButton = document.getElementById('wdd-courses-button');

// Course Grid Elements Generation
const coursesGrid = document.createElement('div');

const creditsCounter = document.createElement('p');


certificateGrid.appendChild(creditsCounter);
certificateGrid.appendChild(coursesGrid);

creditsCounter.innerHTML = 'Credits: <span id="creditQuantity"></span>';
const creditQuantity = document.getElementById('creditQuantity');

function courseRender(courses) {

    coursesGrid.setAttribute('style', 'display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around; gap: 10px; padding-bottom: 10px;')
    
    creditsCounter.setAttribute('style', 'text-align: center;')

    
    let totalCredits = 0;

    courses.forEach(course => {
        let courseName = `${course.subject} ${course.number}`;
        let courseNameContainer = document.createElement('div');
        let nameContainer = document.createElement('p');
        courseNameContainer.className = `${course.subject}`;
        nameContainer.innerHTML = courseName;
        courseNameContainer.appendChild(nameContainer);
        coursesGrid.appendChild(courseNameContainer);

        courseNameContainer.setAttribute('style',
            'background: linear-gradient(45deg, var(--grey-color-slate) 70%, var(--white-color-cosmic-latte)); border-radius: 10px; width: 30%; text-align: center;'
        );

        nameContainer.setAttribute('style',
            'color: var(--white-color-cosmic-latte); font-weight: bold;padding: 20px;'
        );

        if (course.completed) {

            if (course.subject === 'WDD') {

                courseNameContainer.style.background = "linear-gradient(45deg, var(--red-color-carmine) 70%, gold)"; 

            } else if (course.subject === 'CSE') {

                courseNameContainer.style.background = "linear-gradient(45deg, var(--blue-dark-color) 70%, gold)"; 

            }
        } else {
            courseNameContainer.classList.add('uncompleted');
            
        };

        
        totalCredits += course.credits;

    });

    creditQuantity.innerText = totalCredits.toString();
}

function courseFilter(subject) {
    const wddClass = document.querySelectorAll(`.WDD`);
    const cseClass = document.querySelectorAll(`.CSE`);
    const uncompletedClass = document.querySelectorAll(`.uncompleted`);

    switch(subject) {
        case "all":
            // Show all items
            wddClass.forEach(item => item.style.display = 'block');
            cseClass.forEach(item => item.style.display = 'block');
            uncompletedClass.forEach(item => item.style.display = 'block');
            break;

        case "cse":
            // Show only CSE, hide others
            wddClass.forEach(item => item.style.display = 'none');
            cseClass.forEach(item => item.style.display = 'block');
            uncompletedClass.forEach(item => item.style.display = 'block');
            break;

        case "wdd":
            // Show only WDD, hide others
            cseClass.forEach(item => item.style.display = 'none');
            wddClass.forEach(item => item.style.display = 'block');
            uncompletedClass.forEach(item => item.style.display = 'block');
            break;

        case "uncompleted":
            // Show only uncompleted, hide others
            wddClass.forEach(item => item.style.display = 'none');
            cseClass.forEach(item => item.style.display = 'none');
            uncompletedClass.forEach(item => item.style.display = 'block');
            break;

        default:
            throw new Error("Filtering failed successfully");
    }
}


// Event Listeners
allCoursesButton.addEventListener('click', () => courseFilter('all'));
cseCoursesButton.addEventListener('click', () => courseFilter('cse'));
wddCoursesButton.addEventListener('click', () => courseFilter('wdd'));
uncompletedCoursesButton.addEventListener('click', () => courseFilter('uncompleted'));

courseRender(courses);




// Custom Cursor
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");
let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});
function animRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    cursorRing.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animRing);
}
animRing();
document
    .querySelectorAll(
        "a,button,.skill-card,.project-card,.contact-item,.social-card",
    )
    .forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursorRing.style.width = "56px";
            cursorRing.style.height = "56px";
            cursorRing.style.opacity = "0.8";
        });
        el.addEventListener("mouseleave", () => {
            cursorRing.style.width = "36px";
            cursorRing.style.height = "36px";
            cursorRing.style.opacity = "0.5";
        });
    });

// Nav toggle
function toggleNav() {
    document.getElementById("navLinks").classList.toggle("open");
}

// Nav active link on scroll
const sections = document.querySelectorAll("section[id]");
const navAs = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navAs.forEach((a) => {
        a.style.color =
            a.getAttribute("href") === "#" + current ? "var(--accent)" : "";
    });
});

// Resume download placeholder
function downloadResume() {
    alert("Not available for now!");
}

// Loading Screen 


window.addEventListener("load", function () {
    const loader = document.getElementById("pageLoader");
    if (!loader) return;
    loader.classList.add("page-loader-hidden");
    setTimeout(() => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 600);
});

//   fetch project


async function fetchProject() {
    try {
        const res = await fetch('https://yashdev-admin.onrender.com/api/projects')
        const data = await res.json()

        const projects = data.projects
        // console.log(data.totalProject)

        // COUNT TOTAL PROJECT
        const projectGrid = document.querySelector('.projects-grid')
        const totalProject = document.querySelector('.stat-num')
        totalProject.innerText = data.totalProject

        // render in html
        projects.forEach(project => {
            // console.log(project)


            // create elements
            const projectCard = document.createElement('div')
            const projectImageWrap = document.createElement('div')
            const imagePlaceholder = document.createElement('div')
            const projectImage = document.createElement('img')
            const projectBody = document.createElement('div')
            const projectTitle = document.createElement('h3')
            const projectTags = document.createElement('div')

            const projectButtons = document.createElement('div')
            const projectButtonLive = document.createElement('a')
            const projectButtonGithub = document.createElement('a')
            const projectButtonLiveIcon = document.createElement('i')
            const projectButtonGithubIcon = document.createElement('i')


            // add class in  elements
            projectCard.classList.add('project-card')
            projectImageWrap.classList.add('project-img-wrap')
            imagePlaceholder.classList.add('project-img-placeholder')
            projectImage.classList.add('project-img')
            projectBody.classList.add('project-body')
            projectTitle.classList.add('project-title')
            projectTags.classList.add('project-tags')
            // projectTag.classList.add('project-tag')
            projectButtons.classList.add('project-btns')
            projectButtonLive.classList.add('proj-btn', 'proj-btn-primary')
            projectButtonGithub.classList.add('proj-btn', 'proj-btn-ghost')
            projectButtonLiveIcon.classList.add('fas', 'fa-eye')
            projectButtonGithubIcon.classList.add('fas', 'fa-code')

            // add content in element
            projectTitle.innerText = project.title
            projectImage.src = project.image
            projectButtonLive.href = project.liveLink
            projectButtonGithub.href = project.githubLink
            projectButtonLive.append(projectButtonLiveIcon)
            projectButtonGithub.append(projectButtonGithubIcon)


            // render techStack
            const techStacks = project.techStack.split(',')
            techStacks.forEach((stack) => {
                const projectTag = document.createElement('span')
                projectTag.classList.add('project-tag')
                projectTag.innerText = stack.trim()
                projectTags.append(projectTag)


                // console.log(stack.trim())

            })

            // append all elements 
            imagePlaceholder.append(projectImage)
            projectImageWrap.append(imagePlaceholder)
            projectButtonLive.append(projectButtonLiveIcon)
            projectButtonGithub.append(projectButtonGithubIcon)
            projectButtons.append(projectButtonLive)
            projectButtons.append(projectButtonGithub)

            projectBody.append(projectTitle)
            projectBody.append(projectTags)
            projectBody.append(projectButtons)

            projectCard.append(projectImageWrap)
            projectCard.append(projectBody)
            projectGrid.append(projectCard)
        });


    } catch (error) {
        console.log(error.message)
    }
}


fetchProject();





// GET VISITER INFO

const ua = navigator.userAgent;

let browser = "Unknown";

if (ua.includes("Edg")) {
    browser = "Edge";
} else if (ua.includes("Firefox")) {
    browser = "Firefox";
} else if (ua.includes("Chrome")) {
    browser = "Chrome";
} else if (ua.includes("Safari")) {
    browser = "Safari";
}

let os = "Unknown";

if (ua.includes("Windows NT 10.0")) os = "Windows 10";
else if (ua.includes("Windows NT 11.0")) os = "Windows 11";
else if (ua.includes("Android")) os = "Android";
else if (ua.includes("iPhone")) os = "iPhone";
else if (ua.includes("Mac")) os = "macOS";
else if (ua.includes("Linux")) os = "Linux";


let device = "Unknown";

if (/Android/i.test(ua)) {
    device = "Android";
} else if (/iPhone/i.test(ua)) {
    device = "iPhone";
} else if (/iPad/i.test(ua)) {
    device = "iPad";
} else if (/Mobile/i.test(ua)) {
    device = "Mobile";
} else if (/Tablet/i.test(ua)) {
    device = "Tablet";
} else {
    device = "Desktop";
}



const referrer = document.referrer;

let source = "Direct";

if (referrer.includes("instagram")) {
    source = "Instagram";
}
else if (referrer.includes("google")) {
    source = "Google";
}
else if (referrer.includes("linkedin")) {
    source = "LinkedIn";
}
else if (referrer.includes("github")) {
    source = "GitHub";
}
else if (referrer) {
    source = "External Website";
}

// console.log(browser);
// console.log(os);
// console.log(device);
// console.log(source);
// console.log(document.referrer);




const fetchVisitorInfo = async () => {
    try {
        const res = await fetch('https://yashdev-admin.onrender.com/api/visitor-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                visitorBrowser: browser,
                visitorOS: os,
                visitorDevice: device,
                visitorSource: source,

            })
        })
    } catch (error) {
        console.log(error.message)
    }
}


window.addEventListener('DOMContentLoaded', () => {
    fetchVisitorInfo()
})














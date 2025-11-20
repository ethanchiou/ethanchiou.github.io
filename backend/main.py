from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "https://ethanchiou.github.io",  # GitHub Pages where site is hosted
    "https://www.ethanchiou.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class Project(BaseModel):
    id: int
    title: str
    description: str
    technologies: List[str]
    link: str

class Experience(BaseModel):
    id: int
    company: str
    role: str
    period: str
    description: str
    technologies: List[str]


projects_data = [
    Project(
        id=1,
        title="my website :)",
        description="A personal portfolio website built with Next.js and FastAPI.",
        technologies=["Next.js", "FastAPI", "TypeScript", "Tailwind CSS", "Python"],
        link="https://github.com/ethanchiou/portfolio"
    ),
    Project(
        id=2,
        title="Cyberton",
        description="Second Place - McMaster Sumobot Competition.\n Programmed iterative algorithm in C++ optimized in opponent detection speed",
        technologies=["C++", "Soldering", "Embedded Systems", "Robotics", "Arduino"],
        link=""
    ),
    Project(
        id = 3,
        title="Subway Sweepers",
        description="The smart roomba for city cleaning. Utilizing computer vision along with a raspberry pi and arduino mega, the car would detect, classify and sort trash.",
        technologies=["Python", "PyTorch", "C++", "Computer Vision", "Robotics","Embedded Systems","Raspberry Pi","Arduino" ,"Machine Learning"],
        link=""
    ),
    Project(
        id=4,
        title="ZenLens",
        description="A joystick controlled phone gimbal designed to enable a photographer with Parkinson's disease restore her ability to capture steady photos. Firmware was developed on an arduino and translated joystick inputs to precise 8 directional phone movements.",
        technologies=["C++", "Embedded Systems", "Arduino"],
        link=""
    )
]

experience_data = [
    Experience(
        id=1,
        company="mba4hire",
        role="Software Developer",
        period="June 2025 - August 2025",
        description="Developed web services that enabled users to generate customizeable interactive financial graphs and streamlined financial operations.\nWorked with financial data APIs with secure key management to fetch, proccess and visualize live market information within users customizeable dashboards.",
        technologies=["TypeScript", "Next.js"]
    )
]

# Endpoints
@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio API"}

@app.get("/api/profile")
def get_profile():
    return {
        "name": "Ethan Chiou",
        "role": "Software Engineer",
        "bio": "Passionate about building scalable software and exploring AI technologies."
    }

@app.get("/api/projects", response_model=List[Project])
def get_projects():
    # My custom order to display my projects
    sorted_projects = sorted(projects_data, key=lambda project: project.id)
    return sorted_projects

@app.get("/api/experience", response_model=List[Experience])
def get_experience():
    return experience_data
